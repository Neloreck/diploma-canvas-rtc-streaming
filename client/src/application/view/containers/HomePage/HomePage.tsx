import * as React from "react";
import {Component} from "react";
import {bindActionCreators} from "redux";

import {TestAction} from "@Store/auth/actions/TestAction";

import {ReduxConnect} from "@App/data/redux";

export interface IHomePageStoreProps {
  asm: number;
}

export interface IHomePageDispatchProps {
  sendTest: any;
}

export interface IHomePageProps extends IHomePageStoreProps, IHomePageDispatchProps {
}

@ReduxConnect<IHomePageStoreProps, IHomePageDispatchProps, IHomePageProps>(
  (store) => {
    return { asm: 1 };
  }, (dispatch): IHomePageDispatchProps => {
    return bindActionCreators({
      sendTest: () => ( new TestAction(Math.random()) )
    }, dispatch);
  })
export class HomePage extends Component<IHomePageProps> {

  public render(): JSX.Element {
    return (
      <div id={"home-page"}>
        <button onClick={() => this.props.sendTest()}> TEST </button>
      </div>
    );
  }

}
