import { ReactContextManager } from "@redux-cbd/context";
import { Bind } from "@redux-cbd/utils";
import { createBrowserHistory, History } from "history";
import { parse, ParsedUrlQuery } from "querystring";

// Lib.
import { Logger } from "@Lib/utils";

export interface IRouterContext {
  routingActions: {
    replace(path: string): void;
    push(path: string): void;
    goBack(): void;
    getCurrentLocation(): string;
    getQueryParams(): ParsedUrlQuery;
    getLastPart(): string;
  };
  routingState: {
    history: History;
  };
}

export class RouterContextManager extends ReactContextManager<IRouterContext> {

  public context: IRouterContext = {
    routingActions: {
      getCurrentLocation: this.getCurrentLocation,
      getLastPart: this.getLastPart,
      getQueryParams: this.getQueryParams,
      goBack: this.goBack,
      push: this.push,
      replace: this.replace
    },
    routingState: {
      history: createBrowserHistory()
    }
  };

  protected log: Logger = new Logger("[🗺️C-ROUTER]", true);

  // Getters.

  @Bind()
  public getLastPart(): string {

    const path: string = this.context.routingState.history.location.pathname;

    return path.substr(path.lastIndexOf("/") + 1);
  }

  @Bind()
  public getCurrentLocation(): string {
    return this.context.routingState.history.location.pathname;
  }

  @Bind()
  public getQueryParams(): ParsedUrlQuery {
    return parse(this.context.routingState.history.location.search.slice(1));
  }

  // Actions.

  @Bind()
  public replace(path: string): void {

    this.log.info(`Replace path: ${path}.`);
    this.context.routingState.history.replace(path);
    this.update();
  }

  @Bind()
  public push(path: string): void {

    this.log.info(`Push path: ${path}.`);
    this.context.routingState.history.push(path);
    this.update();
  }

  @Bind()
  public goBack(): void {

    this.log.info(`Go back.`);
    this.context.routingState.history.goBack();
    this.update();
  }

}
