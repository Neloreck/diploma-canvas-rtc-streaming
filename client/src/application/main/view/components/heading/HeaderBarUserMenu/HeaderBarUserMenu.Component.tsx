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
  IconButton, Menu, MenuItem, WithStyles,
} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import {headerBarUserMenuStyle} from "./HeaderBarUserMenu.Style";

// Props.
export interface IHeaderBarUserMenuState {
  showContextMenu: boolean;
  menuAnchor: Optional<HTMLDivElement>;
}

export interface IHeaderBarUserMenuOwnProps {}
export interface IHeaderBarUserMenuExternalProps extends WithStyles<typeof headerBarUserMenuStyle>, IRouterContext, IAuthContext {}
export interface IHeaderBarUserMenuProps extends IHeaderBarUserMenuOwnProps, IHeaderBarUserMenuExternalProps {}

@Styled(headerBarUserMenuStyle)
@Consume<IRouterContext, IHeaderBarUserMenuProps>(routerContextManager)
@Consume<IAuthContext, IHeaderBarUserMenuProps>(authContextManager)
export class HeaderBarUserMenu extends Component<IHeaderBarUserMenuProps, IHeaderBarUserMenuState> {

  public state: IHeaderBarUserMenuState = {
    menuAnchor: null,
    showContextMenu: false
  };

  public render(): ReactNode {

    const {menuAnchor, showContextMenu} = this.state;

    return (
      <Fragment>

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
          <MenuItem onClick={this.onLogoutMenuItemClicked}>Logout</MenuItem>
        </Menu>

      </Fragment>
    );
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

}
