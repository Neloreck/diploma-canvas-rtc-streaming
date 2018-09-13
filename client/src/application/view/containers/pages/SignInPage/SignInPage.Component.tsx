import * as React from "react";
import {Component} from "react";

import {withConnection, withStyle} from "@Annotate";
import {IGlobalStoreState} from "@Redux";

import {
  ISignInPageDispatchProps,
  ISignInPageProps,
  ISignInPageStoreProps
} from "./SignInPage.StateProps";

import {signInPageStyle} from "./SignInPage.Style";

import {Grid} from "@material-ui/core";

import {ISignInFormExternalProps, SignInForm} from "@Components/pages/signing/SignInForm";

import {HeaderBar, IHeaderBarExternalProps} from "@Containers/elements/HeaderBar";

@withConnection<ISignInPageStoreProps, ISignInPageDispatchProps, ISignInPageProps>(
  (store: IGlobalStoreState) => ({
    authorizing: store.auth.authorizing
  }), {
  })
@withStyle(signInPageStyle)
export class SignInPage extends Component<ISignInPageProps> {

  public render(): JSX.Element {
    return (
      <Grid className={this.props.classes.root} container>

        <HeaderBar {...{} as IHeaderBarExternalProps}> </HeaderBar>

        <Grid container justify={"center"} alignItems={"center"} className={this.props.classes.content}>

          <SignInForm {...{} as ISignInFormExternalProps}/>

        </Grid>

      </Grid>
    );
  }

}
