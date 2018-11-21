import * as React from "react";
import {Component} from "react";

import {Styled} from "@Lib/react_lib/@material_ui";

import {Grid, WithStyles} from "@material-ui/core";

import {ISignUpFormExternalProps, SignUpForm} from "@Main/view/components/SignUpForm";
import {HeaderBar, IHeaderBarExternalProps} from "@Main/view/containers/HeaderBar";

import {signUpPageStyle} from "./SignUpPage.Style";

export interface ISignUpPageOwnProps {}

export interface ISignUpPageExternalProps extends WithStyles<typeof signUpPageStyle> {}

export interface ISignUpPageProps extends ISignUpPageOwnProps, ISignUpPageExternalProps {
}

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
