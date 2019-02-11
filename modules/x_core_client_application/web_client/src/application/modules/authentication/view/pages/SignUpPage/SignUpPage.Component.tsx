import * as React from "react";
import { Component, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/react_lib/mui";

// View.
import { HeaderBar, IHeaderBarExternalProps } from "@Main/view/components/heading";
import { Grid, Grow, WithStyles } from "@material-ui/core";
import { ISignUpFormExternalProps, SignUpForm } from "@Module/authentication/view/components/SignUpForm";
import { signUpPageStyle } from "./SignUpPage.Style";

// Props.
export interface ILoginPageState {
  mounted: boolean;
}

export interface ISignUpPageOwnProps {}
export interface ISignUpPageExternalProps extends WithStyles<typeof signUpPageStyle> {}
export interface ISignUpPageProps extends ISignUpPageOwnProps, ISignUpPageExternalProps {}

@Styled(signUpPageStyle)
export class SignUpPage extends Component<ISignUpPageProps> {

  public state: ILoginPageState = {
    mounted: true
  };

  public componentDidMount(): void {
    this.setState({ mounted: true });
  }

  public componentWillUnmount(): void {
    this.setState({ mounted: false });
  }

  public render(): ReactNode {

    const { classes } = this.props;
    const { mounted } = this.state;

    return (
      <Grid className={classes.root} container>

        <HeaderBar {...{} as IHeaderBarExternalProps}/>

        <Grow in={mounted}>
          <Grid container justify={"center"} alignItems={"center"} className={classes.content}>
            <SignUpForm {...{} as ISignUpFormExternalProps}/>
          </Grid>
        </Grow>

      </Grid>
    );
  }

}
