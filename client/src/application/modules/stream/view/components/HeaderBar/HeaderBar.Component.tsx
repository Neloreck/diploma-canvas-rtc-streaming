import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Component, Fragment, MouseEvent, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";
import {Optional} from "@Lib/ts/types";

// Data.
import {authContextManager, IAuthContext, IRouterContext, routerContextManager} from "@Main/data/store";

// View.
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  WithStyles,
  Zoom
} from "@material-ui/core";
import {AccountCircle, Home, LiveTv} from "@material-ui/icons";
import {headerBarStyle} from "./HeaderBar.Style";

// Props.
export interface IHeaderBarState {
  showContextMenu: boolean;
  menuAnchor: Optional<HTMLDivElement>;
}

export interface IHeaderBarOwnProps {}
export interface IHeaderBarExternalProps extends WithStyles<typeof headerBarStyle>, IRouterContext, IAuthContext {}
export interface IHeaderBarProps extends IHeaderBarOwnProps, IHeaderBarExternalProps {}

@Styled(headerBarStyle)
@Consume<IRouterContext, IHeaderBarProps>(routerContextManager)
@Consume<IAuthContext, IHeaderBarProps>(authContextManager)
export class HeaderBar extends Component<IHeaderBarProps, IHeaderBarState> {

  public state: IHeaderBarState = {
    menuAnchor: null,
    showContextMenu: false
  };

  public render(): ReactNode {

    const {classes} = this.props;

    return (
      <AppBar className={classes.root} position={"static"}>

        <Toolbar className={classes.toolBar}>

          <IconButton className={classes.homeButton} onClick={this.redirectToIndexPage}>
            <Home fontSize={"small"}/>
          </IconButton>

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

  private renderRightBarDetails(): ReactNode {

    const {classes, routingActions: {getCurrentLocation}, authState: {authorizing, authorized, authData}} = this.props;
    const {menuAnchor, showContextMenu} = this.state;

    const currentLocation: string = getCurrentLocation();
    const isLoginPage: boolean = (currentLocation === "/authorization/login");
    const isSignUpPage: boolean = (currentLocation === "/authorization/register");

    const opened = true;

    if (authorized && authData !== null) {
     return (
       <Fragment>

         <Button className={classes.startButton} variant={"contained"} color={"secondary"} size={"small"}>
           Start <LiveTv className={classes.startIcon} fontSize={"small"}/>
         </Button>

         <IconButton
           aria-owns={opened ? "menu-app-bar" : undefined}
           aria-haspopup="true"
           onClick={this.onProfileMenuToggle}
         >
           <AccountCircle/>
         </IconButton>

         <Menu
           id={"menu-app-bar"}
           anchorOrigin={{
             horizontal: "right",
             vertical: "top"
           }}
           transformOrigin={{
             horizontal: "right",
             vertical: "top"
           }}
           anchorEl={menuAnchor}
           open={showContextMenu}
           onClose={this.onProfileMenuToggle}
         >
           <MenuItem onClick={this.onLogoutMenuItemClicked}>Logout</MenuItem>
         </Menu>

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
  private onProfileMenuToggle(event: MouseEvent<HTMLDivElement>): void {
    const {showContextMenu, menuAnchor} = this.state;
    this.setState({ menuAnchor: menuAnchor ? null : event.target as HTMLDivElement, showContextMenu: !showContextMenu });
  }

  @Bind()
  private onLogoutMenuItemClicked(event: MouseEvent<any>): void {
    this.props.authActions.logout();
    this.setState({ menuAnchor: null, showContextMenu: false });
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
  private onStartStream(): void {
  }

  @Bind()
  private redirectToLoginPage(): void {

    const {routingActions: {push}} = this.props;

    push("/authorization/login");
  }

  @Bind()
  private redirectToSignUpPage(): void {

    const {routingActions: {push}} = this.props;

    push("/authorization/register");
  }

}
