import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// View.
import { HeaderBar, IHeaderBarInjectedProps } from "@Main/view/components/heading";
import { Grid, WithStyles } from "@material-ui/core";
import { ILoginFormInjectedProps, LoginForm } from "@Module/authentication/view/components/LoginForm";
import { loginPageStyle } from "./LoginPage.Style";

// Props.
export interface ILoginPageOwnProps {}
export interface ILoginPageInjectedProps extends WithStyles<typeof loginPageStyle> {}
export interface ILoginPageProps extends ILoginPageOwnProps, ILoginPageInjectedProps {}

@Styled(loginPageStyle)
export class LoginPage extends PureComponent<ILoginPageProps> {

  public render(): ReactNode {

    const { classes } = this.props;

    return (
      <Grid
        className={classes.root}
        container
      >

        <HeaderBar {...{} as IHeaderBarInjectedProps}/>

        <Grid
          className={classes.content}
          container
          justify={"center"}
          alignItems={"center"}
        >

          <LoginForm {...{} as ILoginFormInjectedProps}/>

        </Grid>

      </Grid>
    );
  }

}
