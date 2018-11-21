import * as React from "react";
import {Component} from "react";

import {Styled} from "@Lib/react_lib/@material_ui";

import {Grid, WithStyles} from "@material-ui/core";

import {ISignInFormExternalProps, SignInForm} from "@Main/view/components/SignInForm";
import {HeaderBar, IHeaderBarExternalProps} from "@Main/view/containers/HeaderBar";

import {signInPageStyle} from "./SignInPage.Style";

export interface ISignInPageExternalProps extends WithStyles<typeof signInPageStyle> {}

export interface ISignInPageOwnProps {}

export interface ISignInPageProps extends ISignInPageOwnProps, ISignInPageExternalProps {}

@Styled(signInPageStyle)
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