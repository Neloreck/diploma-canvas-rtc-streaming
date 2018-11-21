import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import {createBrowserHistory, History} from "history";

export interface IRouterContextState {
  routingActions: {
    replace: (path: string) => void;
    push: (path: string) => void;
  };
  routingState: {
    history: History;
  };
}

export class RouterContext extends ReactContextManager<IRouterContextState> {

  protected state: IRouterContextState = {
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
    this.state.routingState.history.replace(path);
  }

  @Bind()
  protected push(path: string): void {
    this.state.routingState.history.push(path);
  }

}
