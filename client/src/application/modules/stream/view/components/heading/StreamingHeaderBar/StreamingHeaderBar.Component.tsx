import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Fragment, PureComponent, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// Data.
import {authContextManager, IAuthContext} from "@Main/data/store";
import {connectionContextManager, IConnectionContext} from "@Module/stream/data/store";

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
import {streamingHeaderBarStyle} from "./StreamingHeaderBar.Style";

// Props.

export interface IStreamingHeaderBarOwnProps {}
export interface IStreamingHeaderBarExternalProps extends WithStyles<typeof streamingHeaderBarStyle>, IConnectionContext, IAuthContext {}
export interface IStreamingHeaderBarProps extends IStreamingHeaderBarOwnProps, IStreamingHeaderBarExternalProps {}

@Styled(streamingHeaderBarStyle)
@Consume<IAuthContext, IStreamingHeaderBarProps>(authContextManager)
@Consume<IConnectionContext, IStreamingHeaderBarProps>(connectionContextManager)
export class StreamingHeaderBar extends PureComponent<IStreamingHeaderBarProps> {

  public render(): ReactNode {

    const {classes, authState: {authorized}} = this.props;

    return (
      <AppBar className={classes.root} position={"static"}>

        <Toolbar className={classes.toolBar}>

          <HeaderBarLogoNavigation {...{} as IHeaderBarLogoNavigationExternalProps}/>

          <Grid container className={classes.rightBar} alignItems={"center"} justify={"flex-end"}>
            {
              authorized
                ?
                <Fragment>

                  {this.renderGoLiveButton()}

                  <HeaderBarUserMenu {...{} as IHeaderBarUserMenuExternalProps}/>

                </Fragment>
                : <HeaderBarAuthNavigation {...{} as IHeaderBarAuthNavigationExternalProps}/>
            }
          </Grid>

        </Toolbar>
      </AppBar>
    );
  }

  private renderGoLiveButton(): ReactNode {

    const {classes, connectionState: {online, live}, connectionActions: {goLive}} = this.props;

    if (live) {
      return (
        <Grid>
          Live
        </Grid>
      );
    } else {
      return (
        <Button variant={"outlined"} size={"small"} onClick={goLive} disabled={!online}>
          Go Live <LiveTv className={classes.startIcon} fontSize={"small"}/>
        </Button>
      );
    }
  }

}
