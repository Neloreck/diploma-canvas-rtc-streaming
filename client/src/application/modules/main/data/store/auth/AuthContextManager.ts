import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";

// Lib.
import {authClient} from "@Lib/api/x-core";
import {Optional} from "@Lib/ts/types";
import {Logger} from "@Lib/utils";

// Data.
import {IUserAuthData} from "./models/IUserAuthData";

export interface IAuthContext {
  authActions: {
    login: (login: string, password: string) => Promise<void>;
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
      login: this.login
    },
    authState: {
      authData: null,
      authorized: false,
      authorizing: false,
      errorMessage: null
    }
  };

  protected log: Logger = new Logger("[AUTH]", true);

  @Bind()
  protected async login(username: string, password: string): Promise<void> {

    this.log.info(`Logging in new user: '${username}'.`);

    let state = this.context.authState;

    // Do not dup requests.
    if (state.authorizing) {
      return;
    }

    state.authorizing = true;
    state = this.updateStateRef();
    this.update();

    try {
      const response = await authClient.getTokens(username, password);

      if (response.error) {
        state.authData = null;
        state.errorMessage = response.error;
      } else {
        state.errorMessage = null;
        state.authData = {
          access_token: response.access_token,
          refresh_token: response.refresh_token,
          username
        };
      }
    } catch (error) {
      this.log.error("Auth request attempt failed: ", error);
    } finally {
      state.authorized = (state.authData !== null);
      state.authorizing = false;

      this.log.info("Current auth status: ", state.authorized, ".");

      this.updateStateRef();
      this.update();
    }
  }

  @Bind()
  protected updateStateRef() {
    this.context.authState = Object.assign({}, this.context.authState);
    return this.context.authState;
  }

}
