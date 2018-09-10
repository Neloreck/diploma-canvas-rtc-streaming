import * as React from "react";
import {Component} from "react";

import {Button} from "@material-ui/core";

import {withConnection, withStyle} from "@Annotate";
import {IGlobalStoreState} from "@Redux";

import {ISignInPageDispatchProps, ISignInPageProps, ISignInPageStoreProps} from "./SignInPage.StateProps";

import {signInPageStyle} from "./SignInPage.Style";

import {HeaderBar, IHeaderBarProps} from "@Containers/elements/HeaderBar";

@withConnection<ISignInPageStoreProps, ISignInPageDispatchProps, ISignInPageProps>(
  (store: IGlobalStoreState) => ({
    authorizing: store.auth.authorizing
  }), {
  })
@withStyle(signInPageStyle)
export class SignInPage extends Component<ISignInPageProps> {

  public render(): JSX.Element {
    return (
      <div className={this.props.classes.root}>

        <HeaderBar {...{} as IHeaderBarProps}> </HeaderBar>

        <div className={this.props.classes.content}>
          <Button variant="contained">Sign In</Button>
        </div>

      </div>
    );
  }

}
