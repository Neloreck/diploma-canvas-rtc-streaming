import * as React from "react";
import {Component} from "react";

import {Grid} from "@material-ui/core";

import {Styled} from "@Lib/react_lib/@material_ui";

import {GlobalStoreConnect, IGlobalStoreState} from "@Main/data/store";

import {ISignUpFormExternalProps, SignUpForm} from "@Main/view/components/pages/signing/SignUpForm";
import {HeaderBar, IHeaderBarExternalProps} from "@Main/view/containers/elements/HeaderBar";

import {ISignUpPageDispatchProps, ISignUpPageProps, ISignUpPageStoreProps} from "./SignUpPage.StateProps";
import {signUpPageStyle} from "./SignUpPage.Style";

@GlobalStoreConnect<ISignUpPageStoreProps, ISignUpPageDispatchProps, ISignUpPageProps>(
  (store: IGlobalStoreState) => ({
  }), {
  })
@Styled(signUpPageStyle)
export class SignUpPage extends Component<ISignUpPageProps> {

  public render(): JSX.Element {
    return (
      <Grid className={this.props.classes.root} container>

        <HeaderBar {...{} as IHeaderBarExternalProps}/>

        <Grid container justify={"center"} alignItems={"center"} className={this.props.classes.content}>

          <SignUpForm {...{} as ISignUpFormExternalProps}/>

        </Grid>

      </Grid>
    );
  }

}
