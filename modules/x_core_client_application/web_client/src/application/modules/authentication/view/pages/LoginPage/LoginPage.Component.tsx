import * as React from "react";
import { Component, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// View.
import { HeaderBar, IHeaderBarInjectedProps } from "@Main/view/components/heading";
import { Grid, Grow, WithStyles } from "@material-ui/core";
import { ILoginFormInjectedProps, LoginForm } from "@Module/authentication/view/components/LoginForm";
import { loginPageStyle } from "./LoginPage.Style";

// Props.
export interface ILoginPageState {
  mounted: boolean;
}

export interface ILoginPageOwnProps {}
export interface ILoginPageInjectedProps extends WithStyles<typeof loginPageStyle> {}
export interface ILoginPageProps extends ILoginPageOwnProps, ILoginPageInjectedProps {}

@Styled(loginPageStyle)
export class LoginPage extends Component<ILoginPageProps, ILoginPageState> {

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
      <Grid
        className={classes.root}
        container
      >

        <HeaderBar {...{} as IHeaderBarInjectedProps}/>

        <Grow in={mounted}>
          <Grid
            className={classes.content}
            container
            justify={"center"}
            alignItems={"center"}
          >
            <LoginForm {...{} as ILoginFormInjectedProps}/>
          </Grid>
        </Grow>

      </Grid>
    );
  }

}
