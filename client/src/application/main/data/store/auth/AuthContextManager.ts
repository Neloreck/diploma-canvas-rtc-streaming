import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";

// Lib.
import {authClient} from "@Api/x-core";
import {Optional} from "@Lib/ts/types";
import {DocumentStoreUtils, Logger} from "@Lib/utils";

// Api.
import {IAuthInfoResponse} from "@Api/x-core/auth/response/IAuthInfoResponse";
import {ITokensResponse} from "@Api/x-core/auth/response/ITokensResponse";

// Data.
import {IUserAuthData} from "./models/IUserAuthData";
import {routerContextManager} from "@Main/data/store";

export interface IAuthContext {
  authActions: {
    login: (login: string, password: string) => Promise<Optional<IUserAuthData>>;
    cleanupErrorMessage: () => void;
  };
  authState: {
    authorizing: boolean;
    authorized: boolean;
    authData: Optional<IUserAuthData>;
    errorMessage: Optional<string>;
  };
}

export class AuthContextManager extends ReactContextManager<IAuthContext> {

  public context: IAuthContext = {
    authActions: {
      cleanupErrorMessage: this.cleanupErrorMessage,
      login: this.login
    },
    authState: {
      authData: null,
      authorized: false,
      authorizing: false,
      errorMessage: null
    }
  };

  protected log: Logger = new Logger("[🌋AUTH]", true);

  public constructor() {
    super();

    this.initialize().then();
  }

  @Bind()
  protected async initialize(): Promise<void> {

    this.log.info("Initialize current auth status.");

    if (this.hasAuthToken()) {

      this.log.info("Have valid access token, trying to get default auth info.");

      await this.updateUserInfo();

    } else {
      if (this.hasRefreshToken()) {
        this.log.info("Have valid refresh token, trying to refresh current tokens.");
        await this.refresh();
      } else {
        this.log.info("No tokens stored currently, continue with default flow.");
      }
    }
  }

  @Bind()
  protected async refresh(): Promise<void> {
    DocumentStoreUtils.eraseCookie("access_token");
    DocumentStoreUtils.eraseCookie("refresh_token");
  }

  @Bind()
  protected async logout(): Promise<void> {

    const {authState} = this.context;

    if (authState.authorizing) {
      throw new Error("Cannot logout while authorizing.");
    }

    DocumentStoreUtils.eraseCookie("access_token");
    DocumentStoreUtils.eraseCookie("refresh_token");

    authState.authData = null;
    authState.authorized = false;

    routerContextManager.push("/");

    this.update();
  }

  @Bind()
  protected async login(username: string, password: string): Promise<Optional<IUserAuthData>> {

    this.log.info(`Logging in new user: '${username}'.`);

    let state = this.context.authState;

    // Do not dup requests.
    if (state.authorizing) {
      throw new Error("Cannot authorize while already authorizing.");
    }

    // Set loading state.
    state.authorizing = true;
    this.update();

    // Try to authorize.
    try {
      const response: ITokensResponse = await authClient.getTokens(username, password);
      state = this.context.authState;

      if (response.error) {
        state.authData = null;
        state.errorMessage = response.error.message;
      } else {
        state.errorMessage = null;
        state.authData = {
          username: response.username
        };

        this.saveAuthData(response);
      }
    } catch (error) {
      this.log.error("Auth request attempt failed: ", error);
    } finally {
      state.authorized = (state.authData !== null);
      state.authorizing = false;

      this.log.info(`Current auth status: '${state.authorized}', '${state.errorMessage}'.`);

      this.update();
    }

    return state.authData;
  }

  @Bind()
  protected async updateUserInfo(): Promise<void> {

    let {authState} = this.context;

    // Set loading state.
    authState.authorizing = true;
    this.update();

    authState = this.context.authState;

    try {
      const response: IAuthInfoResponse = await authClient.getAuthInfo({});
      authState.authData = { username: response.username };
    } catch (error) {
      this.log.error("Auth request attempt failed: ", error);
    } finally {
      authState.authorized = (authState.authData !== null);
      authState.authorizing = false;

      this.log.info(`Current auth status: '${authState.authorized}', '${authState.errorMessage}'.`);

      this.update();
    }
  }

  @Bind()
  protected cleanupErrorMessage(): void {
    if (this.context.authState.errorMessage) {
      this.context.authState.errorMessage = null;
      this.update();
    }
  }

  @Bind()
  protected saveAuthData(tokensResponse: ITokensResponse): void {
    DocumentStoreUtils.setCookie("access_token", tokensResponse.access_token, { expires: tokensResponse.expires_in });
    DocumentStoreUtils.setCookie("refresh_token", tokensResponse.refresh_token);
  }

  @Bind()
  protected hasAuthToken(): boolean {
    return Boolean(DocumentStoreUtils.getCookie("access_token"));
  }

  @Bind()
  protected hasRefreshToken(): boolean {
    return Boolean(DocumentStoreUtils.getCookie("refresh_token"));
  }

  @Bind()
  protected beforeUpdate(): void {
    this.context.authState = Object.assign({}, this.context.authState);
  }

}
