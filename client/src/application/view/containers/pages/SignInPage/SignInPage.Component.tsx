import * as React from "react";
import {Component} from "react";

import {Button} from "@material-ui/core";

import {withConnection, withStyle} from "@Annotate";
import {IGlobalStoreState} from "@Redux";
import {TestAction} from "@Store/auth/actions";

import {
  ISignInPageDispatchProps,
  ISignInPageOwnProps,
  ISignInPageProps,
  ISignInPageStoreProps
} from "./SignInPage.StateProps";

import {signInPageStyle} from "./SignInPage.Style";

import {HeaderBar, IHeaderBarProps} from "@Containers/elements/HeaderBar";

@withConnection<ISignInPageStoreProps, ISignInPageDispatchProps, ISignInPageOwnProps>(
  (store: IGlobalStoreState) => {
    return { testValue: store.auth.temp };
  }, {
    sendTest: (num: number) => new TestAction(num)
  })
@withStyle(signInPageStyle)
export class SignInPage extends Component<ISignInPageProps> {

  public render(): JSX.Element {
    return (
      <div className={this.props.classes.root}>

        <HeaderBar {...{} as IHeaderBarProps}> </HeaderBar>

        <div className={this.props.classes.content}>
          <Button variant="contained">Sign In</Button>
          <button onClick={() => this.props.sendTest(Math.random() * 100 + 10)}> TEST </button>
          {this.props.testValue}
        </div>

      </div>
    );
  }

}
