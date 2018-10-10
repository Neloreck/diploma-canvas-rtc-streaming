import * as React from "react";
import {Component} from "react";

import {Grid} from "@material-ui/core";

import {withStyle} from "../../../../../../lib/ts/annotate/index";

import {ISignUpPageDispatchProps, ISignUpPageProps, ISignUpPageStoreProps} from "./SignUpPage.StateProps";
import {signUpPageStyle} from "./SignUpPage.Style";

import {GlobalStoreConnect, IGlobalStoreState} from "../../../../data/store/index";

import {ISignUpFormExternalProps, SignUpForm} from "../../../components/pages/signing/SignUpForm/index";
import {HeaderBar, IHeaderBarExternalProps} from "../../elements/HeaderBar/index";

@GlobalStoreConnect<ISignUpPageStoreProps, ISignUpPageDispatchProps, ISignUpPageProps>(
  (store: IGlobalStoreState) => ({
  }), {
  })
@withStyle(signUpPageStyle)
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
