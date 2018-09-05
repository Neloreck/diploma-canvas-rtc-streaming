import * as React from "react";
import {Component} from "react";

import {TestAction} from "@Store/auth/actions/TestAction";

import {ReduxConnect} from "@Redux";

export interface IHomePageStoreProps {
  testValue: number;
}

export interface IHomePageDispatchProps {
  sendTest: any;
}

export interface IHomePageProps extends IHomePageStoreProps, IHomePageDispatchProps {
}

@ReduxConnect<IHomePageStoreProps, IHomePageDispatchProps, IHomePageProps>(
  (store) => {
    return { testValue: store.auth.temp };
  }, {
    sendTest: (num: number) => new TestAction(num)
  })
export class HomePage extends Component<IHomePageStoreProps & IHomePageDispatchProps> {

  public render(): JSX.Element {

    return (
      <div id={"home-page"}>
        <button onClick={() => this.props.sendTest(Math.random() * 100 + 10)}> TEST </button>
        {this.props.testValue}
      </div>
    );
  }

}
