import * as React from "react";
import {Component, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// View.
import {HeaderBar, IHeaderBarExternalProps} from "@Main/view/components/heading";
import {Grid, Grow, WithStyles} from "@material-ui/core";
import {ILoginFormExternalProps, LoginForm} from "@Module/authorization/view/components/auth/LoginForm";
import {loginPageStyle} from "./LoginPage.Style";

// Props.
export interface ILoginPageState {
  mounted: boolean;
}
export interface ILoginPageExternalProps extends WithStyles<typeof loginPageStyle> {}
export interface ILoginPageOwnProps {}
export interface ILoginPageProps extends ILoginPageOwnProps, ILoginPageExternalProps {}

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

    const {classes} = this.props;
    const {mounted} = this.state;

    return (
      <Grid className={classes.root} container>

        <HeaderBar {...{} as IHeaderBarExternalProps}/>

        <Grow in={mounted}>
          <Grid className={classes.content} container justify={"center"} alignItems={"center"}>
            <LoginForm {...{} as ILoginFormExternalProps}/>
          </Grid>
        </Grow>

      </Grid>
    );
  }

}
