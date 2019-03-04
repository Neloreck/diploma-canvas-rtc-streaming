import { Bind, Consume } from "dreamstate";
import * as React from "react";
import { Component, MouseEvent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";
import { Optional } from "@Lib/ts/types";

// Data.
import {
  authContextManager,
  IAuthContext,
  IRouterContext,
  routerContextManager,
} from "@Main/data/store";

// View.
import {
  IconButton, Menu, MenuItem, WithStyles,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { headerBarUserMenuStyle } from "./HeaderBarUserMenu.Style";

// Props.
export interface IHeaderBarUserMenuState {
  showContextMenu: boolean;
  menuAnchor: Optional<HTMLDivElement>;
}

export interface IHeaderBarUserMenuOwnProps {}
export interface IHeaderBarUserMenuInjectedProps extends WithStyles<typeof headerBarUserMenuStyle>, IRouterContext, IAuthContext {}
export interface IHeaderBarUserMenuProps extends IHeaderBarUserMenuOwnProps, IHeaderBarUserMenuInjectedProps {}

@Styled(headerBarUserMenuStyle)
@Consume(authContextManager, routerContextManager)
export class HeaderBarUserMenu extends Component<IHeaderBarUserMenuProps, IHeaderBarUserMenuState> {

  public state: IHeaderBarUserMenuState = {
    menuAnchor: null,
    showContextMenu: false
  };

  public render(): ReactNode {

    const { authState: { authData } } = this.props;
    const { menuAnchor, showContextMenu } = this.state;

    return (
      <>

        <IconButton
          aria-owns={showContextMenu ? "menu-app-bar" : undefined}
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
          <MenuItem>{(authData && authData.username) || "Unknown"}</MenuItem>
          <MenuItem onClick={this.onLogoutMenuItemClicked}>Logout</MenuItem>
        </Menu>

      </>
    );
  }

  @Bind()
  private onProfileMenuToggle(event: MouseEvent<HTMLDivElement>): void {

    const { showContextMenu, menuAnchor } = this.state;

    this.setState({ menuAnchor: menuAnchor ? null : event.target as HTMLDivElement, showContextMenu: !showContextMenu });
  }

  @Bind()
  private onLogoutMenuItemClicked(): void {

    const { authActions } = this.props;

    this.setState({ menuAnchor: null, showContextMenu: false }, authActions.logout);
  }

}
