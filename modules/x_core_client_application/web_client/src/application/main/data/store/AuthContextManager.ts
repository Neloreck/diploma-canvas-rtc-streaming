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

  protected log: Logger = new Logger("[🌋C-AUTH]", true);

  public constructor() {
    super();

    this.initialize().then();
  }

  // Getters.

  public getCurrentUsername(): Optional<string> {
    return this.context.authState.authData && this.context.authState.authData.username;
  }

  public getAccessToken(): Optional<string> {
    const tokenData: Optional<ITokenData> = getFromLocalStorage("token_data");
    return tokenData && (this.isTokenDataNonExpired(tokenData)) ? tokenData.accessToken : null;
  }

  // General.

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

      this.saveTokenData(response);
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
      state.errorMessage = (response as IXCoreFailedResponse).error.message;
    } else {
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

    const { authState } = this.context;

    if (authState.authorizing) {
      throw new Error("Cannot logout while authorizing.");
    }

    removeLocalStorageItem("token_data");

    authState.authData = null;
    authState.authorized = false;

    routerContextManager.push("/");

    this.update();
  }

  // Inner methods.

  @Bind()
  protected async updateUserInfo(): Promise<void> {

    this.log.info("Updating user information.");

    let { authState } = this.context;

    // Set loading state.
    authState.authorizing = true;
    this.update();

    authState = this.context.authState;

    const response: IAuthInfoResponse = await getAuthInfo({});

    if (response.success && response.authenticated) {
      authState.authData = { username: response.username };
    } else {
      this.log.error("Auth request got error:", response.error);

      removeLocalStorageItem("token_data");
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
  protected saveTokenData(loginResponse: ILoginResponse): void {
    setLocalStorageItem("token_data", {
      accessToken: loginResponse.accessToken,
      expires: loginResponse.expires * 1000,
      received: Date.now(),
      refreshToken: loginResponse.refreshToken
    });
  }

  // Different checks.

  @Bind()
  protected hasAuthToken(): boolean {
    const tokenData: Optional<ITokenData> = getFromLocalStorage("token_data");
    return tokenData !== null && Boolean(tokenData.accessToken) && this.isTokenDataNonExpired(tokenData);
  }

  @Bind()
  protected hasRefreshToken(): boolean {
    return Boolean(getFromLocalStorage("token_data"));
  }

  @Bind()
  protected isTokenDataNonExpired(tokenData: ITokenData): boolean {
    return tokenData.received + tokenData.expires > Date.now();
  }

  // Lifecycle.

  @Bind()
  protected beforeUpdate(): void {
    this.context.authState = Object.assign({}, this.context.authState);
  }

}
