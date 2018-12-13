import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Fragment, PureComponent} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/@material_ui";

// Data.
import {authContextManager, IAuthContext, IRouterContext, routerContextManager} from "@Main/data/store";

// View.
import {AppBar, Button, Grid, IconButton, Toolbar, Typography, WithStyles, Zoom} from "@material-ui/core";
import {Dehaze} from "@material-ui/icons";
import {headerBarStyle} from "./HeaderBar.Style";

// Props.
export interface IHeaderBarOwnProps {}

export interface IHeaderBarExternalProps extends WithStyles<typeof headerBarStyle>, IRouterContext, IAuthContext {}

export interface IHeaderBarProps extends IHeaderBarOwnProps, IHeaderBarExternalProps {}

@Styled(headerBarStyle)
@Consume<IRouterContext, IHeaderBarProps>(routerContextManager)
@Consume<IAuthContext, IHeaderBarProps>(authContextManager)
export class HeaderBar extends PureComponent<IHeaderBarProps> {

  public render(): JSX.Element {

    const {classes} = this.props;

    return (
      <AppBar className={classes.root} position={"static"}>
        <Toolbar>

          <Typography
            className={classes.logo}
            variant={"h5"} color={"inherit"}
            noWrap
            onClick={this.redirectToIndexPage}
          >
            X-CORE
          </Typography>

          <Grid container className={classes.rightBar} alignItems={"center"} justify={"flex-end"}>
            {this.renderRightBarDetails()}
          </Grid>

        </Toolbar>
      </AppBar>
    );
  }

  private renderRightBarDetails(): JSX.Element {

    const {classes, routingActions: {getCurrentLocation}, authState: {authorizing, authorized, authData}} = this.props;

    const currentLocation: string = getCurrentLocation();
    const isLoginPage: boolean = (currentLocation === "/login");
    const isSignUpPage: boolean = (currentLocation === "/signUp");

    if (authorized && authData !== null) {
     return (
       <Fragment>

         <Typography className={classes.usernameLabel} variant={"subtitle1"}>
           {authData.username}
         </Typography>

         <IconButton>
           <Dehaze/>
         </IconButton>

       </Fragment>
     );
    } else {
      return (
        <Fragment>

          <Zoom in={!isLoginPage}>
            <Button disabled={authorizing} variant={"contained"} color={"default"} onClick={this.redirectToLoginPage}>Login</Button>
          </Zoom>

          {
            !isSignUpPage &&
            <Zoom in={!isSignUpPage}>
              <Button disabled={authorizing} variant={"contained"} color={"default"} onClick={this.redirectToSignUpPage}>SignUp</Button>
            </Zoom>
          }

        </Fragment>
      );
    }
  }

  @Bind()
  private redirectToIndexPage(): void {

    const {routingActions: {push}, authState: {authorizing}} = this.props;

    if (authorizing) {
      return;
    }

    push("/home");
  }

  @Bind()
  private redirectToLoginPage(): void {

    const {routingActions: {push}} = this.props;

    push("/login");
  }

  @Bind()
  private redirectToSignUpPage(): void {

    const {routingActions: {push}} = this.props;

    push("/signUp");
  }

}
