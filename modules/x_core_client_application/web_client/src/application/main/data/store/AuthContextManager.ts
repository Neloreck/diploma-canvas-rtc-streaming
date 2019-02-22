import { ReactContextManager } from "@redux-cbd/context";
import { Bind } from "@redux-cbd/utils";

// Lib.
import { Optional } from "@Lib/ts/types";
import { getFromLocalStorage, Logger, removeLocalStorageItem, setLocalStorageItem } from "@Lib/utils";

// Api.
import {
  getAuthInfo,
  IAuthInfoResponse,
  ILoginResponse,
  IRegisterResponse, ITokenData,
  IUserAuthData,
  IXCoreFailedResponse,
  login,
  register
} from "@Api/x-core";

// Data.
import { routerContextManager } from "@Main/data/store";

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

  protected log: Logger = new Logger("[🌋C-AUTH]", true);

  // Getters.

  @Bind()
  public getCurrentUsername(): Optional<string> {
    return this.context.authState.authData && this.context.authState.authData.username;
  }

  @Bind()
  public getAccessToken(): Optional<string> {
    const tokenData: Optional<ITokenData> = getFromLocalStorage("token_data");
    return tokenData && (this.isTokenDataNonExpired(tokenData)) ? tokenData.accessToken : null;
  }

  @Bind()
  public hasAuthToken(): boolean {

    const tokenData: Optional<ITokenData> = getFromLocalStorage("token_data");

    return tokenData !== null && Boolean(tokenData.accessToken) && this.isTokenDataNonExpired(tokenData);
  }

  @Bind()
  public isTokenDataNonExpired(tokenData: ITokenData): boolean {
    return tokenData.received + tokenData.expires > Date.now();
  }

  // General.

  @Bind()
  protected async refresh(): Promise<void> {
    // todo: Refresh tokens.
    removeLocalStorageItem("token_data");
  }

  @Bind()
  protected async login(username: string, password: string): Promise<Optional<IUserAuthData>> {

    this.log.info(`Logging in new user: '${username}'.`);

    let { authState: state } = this.context;

    // Do not dup requests.
    if (state.authorizing) {
      throw new Error("Cannot login while already authorizing.");
    }

    // Set loading state.
    state.authorizing = true;
    this.update();

    // Try to login.
    const response: ILoginResponse = await login({ username, password });

    state = this.context.authState;

    if (response.error) {
      state.authData = null;
      state.errorMessage = (response.error_description ? response.error_description + "." : response.error.message);
    } else {
      state.errorMessage = null;
      state.authData = { username };

      setLocalStorageItem("token_data", {
        accessToken: response.accessToken,
        expires: response.expires * 1000,
        received: Date.now(),
        refreshToken: response.refreshToken
      });
    }

    state.authorized = (state.authData !== null);
    state.authorizing = false;

    this.update();

    return state.authData;
  }

  @Bind()
  protected async register(username: string, mail: string, password: string): Promise<boolean> {

    this.log.info("Registering new user:", username, mail);

    let { authState: state } = this.context;

    // Do not dup requests.
    if (state.authorizing) {
      throw new Error("Cannot register while already authorizing.");
    }

    // Set loading state.
    state.authorizing = true;
    this.update();

    state = this.context.authState;

    const response: IRegisterResponse | IXCoreFailedResponse = await register({ username, mail, password });

    if (response.error) {
      this.log.error("Registering failed for:", username, response.error);
      state.errorMessage = (response as IXCoreFailedResponse).error.message;
    } else {
      this.log.info("Registering successful:", username);
      state.errorMessage = null;
    }

    state.authorizing = false;

    this.update();

    return response.success || false;
  }

  @Bind()
  protected async logout(): Promise<void> {

    // todo: Backend logout request.

    this.log.info("Logging out.");

    const { authState: state } = this.context;

    if (state.authorizing) {
      throw new Error("Cannot logout while authorizing.");
    }

    removeLocalStorageItem("token_data");

    state.authData = null;
    state.authorized = false;

    routerContextManager.push("/");

    this.update();
  }

  // Inner methods.

  @Bind()
  protected async updateUserInfo(): Promise<void> {

    this.log.info("Updating user information.");

    let { authState: state } = this.context;

    // Set loading state.
    state.authorizing = true;
    this.update();

    state = this.context.authState;

    const response: IAuthInfoResponse = await getAuthInfo({});

    if (response.success && response.authenticated) {
      state.authData = { username: response.username };
    } else {
      this.log.error("Auth request got error:", response.error);

      removeLocalStorageItem("token_data");
    }

    state.authorized = (state.authData !== null);
    state.authorizing = false;

    this.log.info(`Current auth status: '${state.authorized}', '${state.errorMessage}'.`);

    this.update();
  }

  @Bind()
  protected cleanupErrorMessage(): void {

    if (this.context.authState.errorMessage) {
      this.context.authState.errorMessage = null;
      this.update();
    }
  }

  // Lifecycle.

  @Bind()
  protected async onProvisionStarted(): Promise<void> {

    this.log.info("Initialize current auth status.");

    if (this.hasAuthToken()) {

      this.log.info("Have valid access token.");

      await this.updateUserInfo();

    } else {
      if (Boolean(getFromLocalStorage("token_data"))) {
        this.log.info("Have valid refresh token, trying to refresh current tokens.");
        await this.refresh();
      } else {
        this.log.info("No tokens stored currently, continue with default flow.");
      }
    }

  }

  @Bind()
  protected beforeUpdate(): void {
    this.context.authState = Object.assign({}, this.context.authState);
  }

}
