import * as React from "react";
import {Component, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/@material_ui";

// View.
import {ILoginFormExternalProps, LoginForm} from "@Main/view/components/auth/LoginForm";
import {HeaderBar, IHeaderBarExternalProps} from "@Main/view/components/HeaderBar";
import {Fade, Grid, WithStyles} from "@material-ui/core";
import {loginPageStyle} from "./LoginPage.Style";

// Props.
export interface ILoginPageExternalProps extends WithStyles<typeof loginPageStyle> {}

export interface ILoginPageOwnProps {}

export interface ILoginPageProps extends ILoginPageOwnProps, ILoginPageExternalProps {}

@Styled(loginPageStyle)
export class LoginPage extends Component<ILoginPageProps> {

  public render(): ReactNode {
    return (
      <Grid className={this.props.classes.root} container>

        <HeaderBar {...{} as IHeaderBarExternalProps}/>

        <Grid className={this.props.classes.content} container justify={"center"} alignItems={"center"}>
          <LoginForm {...{} as ILoginFormExternalProps}/>
        </Grid>

      </Grid>
    );
  }

}
