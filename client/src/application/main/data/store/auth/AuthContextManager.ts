import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";

// Lib.
import {authClient} from "@Api/x-core";
import {Optional} from "@Lib/ts/types";
import {DocumentStoreUtils, Logger} from "@Lib/utils";

// Api.
import {IAuthInfoResponse} from "@Api/x-core/auth/response/IAuthInfoResponse";
import {ITokensResponse} from "@Api/x-core/auth/response/ITokensResponse";
import {IXCoreFailedResponse} from "@Api/x-core/exchange/IXCoreFailedResponse";
import {IUserAuthData} from "@Main/data/store/auth/models/IUserAuthData";

// Data.
import {routerContextManager} from "@Main/data/store";

export interface IAuthContext {
  authActions: {
    login: (login: string, password: string) => Promise<Optional<IUserAuthData>>;
    logout: () => void;
    cleanupErrorMessage: () => void;
    register: (username: string, mail: string, password: string) => Promise<boolean>
  };
  authState: {
    authorizing: boolean;
    authorized: boolean;
    authData: Optional<IUserAuthData>;
    errorMessage: Optional<string>;
  };
}

export class AuthContextManager extends ReactContextManager<IAuthContext> {

  public static readonly MIN_USERNAME_LENGTH: number = 4;
  public static readonly MAX_USERNAME_LENGTH: number = 64;
  public static readonly MIN_PASSWORD_LENGTH: number = 4;
  public static readonly MAX_PASSWORD_LENGTH: number = 64;
  public static readonly MAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public context: IAuthContext = {
    authActions: {
      cleanupErrorMessage: this.cleanupErrorMessage,
      login: this.login,
      logout: this.logout,
      register: this.register,
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

  public getCurrentUsername(): Optional<string> {
    return this.context.authState.authData && this.context.authState.authData.username;
  }

  public getAccessToken(): Optional<string> {
    return DocumentStoreUtils.getCookie("access_token");
  }

  @Bind()
  protected async initialize(): Promise<void> {

    this.log.info("Initialize current auth status.");

    if (this.hasAuthToken()) {

      this.log.info("Have valid access token.");

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

    this.log.info("Logging out.");

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
    const response: ITokensResponse = await authClient.getTokens({ grant_type: "password", username, password });
    state = this.context.authState;

    if (response.error) {
      state.authData = null;
      state.errorMessage = (response.error_description ? response.error_description + "." : response.error);
    } else {
      state.errorMessage = null;
      state.authData = {
        username: response.username
      };

      this.saveAuthData(response);
    }

    state.authorized = (state.authData !== null);
    state.authorizing = false;

    this.update();

    return state.authData;
  }

  @Bind()
  protected async register(username: string, mail: string, password: string): Promise<boolean> {

    this.log.info("Registering new user:", username, mail);

    let state = this.context.authState;

    // Do not dup requests.
    if (state.authorizing) {
      throw new Error("Cannot register while already authorizing.");
    }

    // Set loading state.
    state.authorizing = true;
    this.update();

    state = this.context.authState;

    const response = await authClient.register({ username, mail, password });

    if (response.error) {
      state.errorMessage = (response as IXCoreFailedResponse).error.message;
    } else {
      state.errorMessage = null;
    }

    state.authorizing = false;

    this.update();

    return response.success || false;
  }

  @Bind()
  protected async updateUserInfo(): Promise<void> {

    this.log.info("Updating user information.");

    let {authState} = this.context;

    // Set loading state.
    authState.authorizing = true;
    this.update();

    authState = this.context.authState;

    const response: IAuthInfoResponse = await authClient.getAuthInfo({});

    if (response.success && response.authenticated) {
      authState.authData = {username: response.username};
    } else {
      this.log.error("Auth request got error:", response.error);

      DocumentStoreUtils.eraseCookie("access_token");
      DocumentStoreUtils.eraseCookie("refresh_token");
    }

    authState.authorized = (authState.authData !== null);
    authState.authorizing = false;

    this.log.info(`Current auth status: '${authState.authorized}', '${authState.errorMessage}'.`);

    this.update();
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
