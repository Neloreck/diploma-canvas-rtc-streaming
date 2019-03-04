import { Bind, Consume } from "dreamstate";
import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// Data.
import { authContextManager, IAuthContext, IRouterContext, routerContextManager } from "@Main/data/store";

// View.
import {
  HeaderBarAuthNavigation, IHeaderBarAuthNavigationInjectedProps
} from "@Main/view/components/heading/HeaderBarAuthNavigation";
import {
  HeaderBarLogoNavigation, IHeaderBarLogoNavigationInjectedProps
} from "@Main/view/components/heading/HeaderBarLogoNavigation";
import { HeaderBarUserMenu, IHeaderBarUserMenuInjectedProps } from "@Main/view/components/heading/HeaderBarUserMenu";
import {
  AppBar, Button, Grid, Toolbar, WithStyles,
} from "@material-ui/core";
import { LiveTv } from "@material-ui/icons";
import { headerBarStyle } from "./HeaderBar.Style";

// Props.
export interface IHeaderBarOwnProps {}
export interface IHeaderBarInjectedProps extends WithStyles<typeof headerBarStyle>, IRouterContext, IAuthContext {}
export interface IHeaderBarProps extends IHeaderBarOwnProps, IHeaderBarInjectedProps {}

@Consume(authContextManager, routerContextManager)
@Styled(headerBarStyle)
export class HeaderBar extends PureComponent<IHeaderBarProps> {

  public render(): ReactNode {

    const { classes, authState: { authorized } } = this.props;

    return (
      <AppBar
        className={classes.root}
        position={"static"}
      >

        <Toolbar>

          <HeaderBarLogoNavigation {...{} as IHeaderBarLogoNavigationInjectedProps}/>

          <Grid
            className={classes.rightBar}
            alignItems={"center"}
            justify={"flex-end"}
            container
          >
            {
              authorized
              ?
                <>

                  <Button
                    variant={"outlined"}
                    size={"small"}
                    onClick={this.onGoLive}
                  >
                    Go Live <LiveTv className={classes.liveIcon} fontSize={"small"}/>
                  </Button>

                  <HeaderBarUserMenu {...{} as IHeaderBarUserMenuInjectedProps}/>

                </>
              : <HeaderBarAuthNavigation {...{} as IHeaderBarAuthNavigationInjectedProps}/>
            }
          </Grid>

        </Toolbar>
      </AppBar>
    );
  }

  @Bind()
  private onGoLive(): void {

    const { routingActions: { push } } = this.props;

    push("/stream/create");
  }

}
