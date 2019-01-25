import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Fragment, PureComponent, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// Data.
import {authContextManager, IAuthContext, IRouterContext, routerContextManager} from "@Main/data/store";

// View.
import {
  HeaderBarAuthNavigation, IHeaderBarAuthNavigationExternalProps
} from "@Main/view/components/heading/HeaderBarAuthNavigation";
import {
  HeaderBarLogoNavigation, IHeaderBarLogoNavigationExternalProps
} from "@Main/view/components/heading/HeaderBarLogoNavigation";
import {HeaderBarUserMenu, IHeaderBarUserMenuExternalProps} from "@Main/view/components/heading/HeaderBarUserMenu";
import {
  AppBar, Button, Grid, Toolbar, WithStyles,
} from "@material-ui/core";
import {LiveTv} from "@material-ui/icons";
import {headerBarStyle} from "./HeaderBar.Style";

// Props.

export interface IHeaderBarOwnProps {}
export interface IHeaderBarExternalProps extends WithStyles<typeof headerBarStyle>, IRouterContext, IAuthContext {}
export interface IHeaderBarProps extends IHeaderBarOwnProps, IHeaderBarExternalProps {}

@Styled(headerBarStyle)
@Consume(authContextManager, routerContextManager)
export class HeaderBar extends PureComponent<IHeaderBarProps> {

  public render(): ReactNode {

    const {classes, authState: {authorized}} = this.props;

    return (
      <AppBar className={classes.root} position={"static"}>

        <Toolbar>

          <HeaderBarLogoNavigation {...{} as IHeaderBarLogoNavigationExternalProps}/>

          <Grid container className={classes.rightBar} alignItems={"center"} justify={"flex-end"}>
            {
              authorized
              ?
                <Fragment>

                  <Button variant={"outlined"} size={"small"} onClick={this.onGoLive}>
                    Go Live <LiveTv className={classes.liveIcon} fontSize={"small"}/>
                  </Button>

                  <HeaderBarUserMenu {...{} as IHeaderBarUserMenuExternalProps}/>

                </Fragment>
              : <HeaderBarAuthNavigation {...{} as IHeaderBarAuthNavigationExternalProps}/>
            }
          </Grid>

        </Toolbar>
      </AppBar>
    );
  }

  @Bind()
  private onGoLive(): void {

    const {routingActions: {push}} = this.props;

    push("/stream/create");
  }

}
