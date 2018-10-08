import * as React from "react";
import {Component} from "react";

import {Grid} from "@material-ui/core";

import {withStyle} from "@Lib/annotate";

import {
  ISignInPageDispatchProps,
  ISignInPageProps,
  ISignInPageStoreProps
} from "./SignInPage.StateProps";

import {signInPageStyle} from "./SignInPage.Style";

import {GlobalStoreConnect, IGlobalStoreState} from "@Main/data/store";

import {ISignInFormExternalProps, SignInForm} from "@Main/view/components/pages/signing/SignInForm";
import {HeaderBar, IHeaderBarExternalProps} from "@Main/view/containers/elements/HeaderBar";

@GlobalStoreConnect<ISignInPageStoreProps, ISignInPageDispatchProps, ISignInPageProps>(
  (store: IGlobalStoreState) => ({
    authorizing: store.auth.authorizing
  }), {
  })
@withStyle(signInPageStyle)
export class SignInPage extends Component<ISignInPageProps> {

  public render(): JSX.Element {
    return (
      <Grid className={this.props.classes.root} container>

        <HeaderBar {...{} as IHeaderBarExternalProps}/>

        <Grid container justify={"center"} alignItems={"center"} className={this.props.classes.content}>

          <SignInForm {...{} as ISignInFormExternalProps}/>

        </Grid>

      </Grid>
    );
  }

}
