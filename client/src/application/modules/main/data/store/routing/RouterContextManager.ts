import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import {createBrowserHistory, History} from "history";

export interface IRouterContext {
  routingActions: {
    replace: (path: string) => void;
    push: (path: string) => void;
  };
  routingState: {
    history: History;
  };
}

export class RouterContextManager extends ReactContextManager<IRouterContext> {

  protected context: IRouterContext = {
    routingActions: {
      push: this.push,
      replace: this.replace
    },
    routingState: {
      history: createBrowserHistory()
    }
  };

  @Bind()
  protected replace(path: string): void {
    this.context.routingState.history.replace(path);
  }

  @Bind()
  protected push(path: string): void {
    this.context.routingState.history.push(path);
  }

}
