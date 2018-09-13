import * as React from "react";
import {Component} from "react";

import {Grid} from "@material-ui/core";

import {withConnection, withStyle} from "@Annotate";
import {IGlobalStoreState} from "@Redux";

import {ISignUpPageDispatchProps, ISignUpPageProps, ISignUpPageStoreProps} from "./SignUpPage.StateProps";
import {signUpPageStyle} from "./SignUpPage.Style";

import {HeaderBar, IHeaderBarExternalProps} from "@Containers/elements/HeaderBar";

import {ISignUpFormExternalProps, SignUpForm} from "@Components/pages/signing/SignUpForm";

@withConnection<ISignUpPageStoreProps, ISignUpPageDispatchProps, ISignUpPageProps>(
  (store: IGlobalStoreState) => ({
  }), {
  })
@withStyle(signUpPageStyle)
export class SignUpPage extends Component<ISignUpPageProps> {

  public render(): JSX.Element {
    return (
      <Grid className={this.props.classes.root} container>

        <HeaderBar {...{} as IHeaderBarExternalProps}> </HeaderBar>

        <Grid container justify={"center"} alignItems={"center"} className={this.props.classes.content}>

          <SignUpForm {...{} as ISignUpFormExternalProps}/>

        </Grid>

      </Grid>
    );
  }

}
