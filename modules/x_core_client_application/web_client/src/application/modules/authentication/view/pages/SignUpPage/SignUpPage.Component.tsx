import * as React from "react";
import { Component, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// View.
import { HeaderBar, IHeaderBarInjectedProps } from "@Main/view/components/heading";
import { AnimatedMount } from "@Main/view/utils";
import { Grid, WithStyles } from "@material-ui/core";
import { ISignUpFormInjectedProps, SignUpForm } from "@Module/authentication/view/components/SignUpForm";
import { signUpPageStyle } from "./SignUpPage.Style";

// Props.

export interface ISignUpPageOwnProps {}
export interface ISignUpPageInjectedProps extends WithStyles<typeof signUpPageStyle> {}
export interface ISignUpPageProps extends ISignUpPageOwnProps, ISignUpPageInjectedProps {}

@Styled(signUpPageStyle)
export class SignUpPage extends Component<ISignUpPageProps> {

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <Grid
        className={classes.root}
        container
      >

        <HeaderBar {...{} as IHeaderBarInjectedProps}/>

        <AnimatedMount>

          <Grid
            className={classes.content}
            justify={"center"}
            alignItems={"center"}
            container
          >
            <SignUpForm {...{} as ISignUpFormInjectedProps}/>
          </Grid>

        </AnimatedMount>

      </Grid>
    );
  }

}
