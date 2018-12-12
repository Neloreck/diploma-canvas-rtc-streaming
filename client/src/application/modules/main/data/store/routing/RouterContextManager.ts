import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import {createBrowserHistory, History} from "history";

// Lib.
import {Logger} from "@Lib/utils";

export interface IRouterContext {
  routingActions: {
    replace: (path: string) => void;
    push: (path: string) => void;
    getCurrentLocation: () => string;
  };
  routingState: {
    history: History;
  };
}

export class RouterContextManager extends ReactContextManager<IRouterContext> {

  protected log: Logger = new Logger("[ROUTER]", true);

  protected context: IRouterContext = {
    routingActions: {
      getCurrentLocation: this.getCurrentLocation,
      push: this.push,
      replace: this.replace
    },
    routingState: {
      history: createBrowserHistory()
    }
  };

  @Bind()
  protected replace(path: string): void {

    this.log.info(`Replacing to path: ${path}.`);
    this.context.routingState.history.replace(path);
    this.update();
  }

  @Bind()
  protected push(path: string): void {

    this.log.info(`Pushing to path: ${path}.`);
    this.context.routingState.history.push(path);
    this.update();
  }

  @Bind()
  protected getCurrentLocation(): string {
    return this.context.routingState.history.location.pathname;
  }

}
