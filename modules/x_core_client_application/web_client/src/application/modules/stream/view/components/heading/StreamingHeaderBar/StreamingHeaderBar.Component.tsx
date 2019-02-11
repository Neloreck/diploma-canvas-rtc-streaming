import { Consume } from "@redux-cbd/context";
import { Bind } from "@redux-cbd/utils";
import * as React from "react";
import { Fragment, PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/react_lib/mui";
import { Optional } from "@Lib/ts/types";

// Data.
import { authContextManager, IAuthContext, IRouterContext, routerContextManager } from "@Main/data/store";
import { ILiveContext, liveContextManager } from "@Module/stream/data/store";

// View.
import {
  HeaderBarAuthNavigation, IHeaderBarAuthNavigationExternalProps
} from "@Main/view/components/heading/HeaderBarAuthNavigation";
import {
  HeaderBarLogoNavigation, IHeaderBarLogoNavigationExternalProps
} from "@Main/view/components/heading/HeaderBarLogoNavigation";
import { HeaderBarUserMenu, IHeaderBarUserMenuExternalProps } from "@Main/view/components/heading/HeaderBarUserMenu";
import {
  AppBar, Button, CircularProgress, Grid, IconButton, Toolbar, Typography, WithStyles,
} from "@material-ui/core";
import { LiveTv, Settings } from "@material-ui/icons";
import { streamingHeaderBarStyle } from "./StreamingHeaderBar.Style";

// Props.

export interface IStreamingHeaderBarOwnProps {}
export interface IStreamingHeaderBarExternalProps extends WithStyles<typeof streamingHeaderBarStyle>, ILiveContext, IAuthContext, IRouterContext {}
export interface IStreamingHeaderBarProps extends IStreamingHeaderBarOwnProps, IStreamingHeaderBarExternalProps {}

@Consume(authContextManager, routerContextManager, liveContextManager)
@Styled(streamingHeaderBarStyle)
export class StreamingHeaderBar extends PureComponent<IStreamingHeaderBarProps> {

  public render(): ReactNode {

    const { classes, authState: { authorized } } = this.props;

    return (
      <AppBar className={classes.root} position={"static"}>

        <Toolbar className={classes.toolBar}>

          <HeaderBarLogoNavigation {...{} as IHeaderBarLogoNavigationExternalProps}/>

          <Grid container className={classes.rightBar} wrap={"nowrap"} alignItems={"center"} justify={"flex-end"}>
            {
              authorized
                ?
                <Fragment>

                  {this.renderStreamName()}
                  <Grid className={classes.spacer}/>
                  {this.renderEventControlButtons()}

                  <HeaderBarUserMenu {...{} as IHeaderBarUserMenuExternalProps}/>
                </Fragment>
                : <HeaderBarAuthNavigation {...{} as IHeaderBarAuthNavigationExternalProps}/>
            }
          </Grid>

        </Toolbar>
      </AppBar>
    );
  }

  private renderStreamName(): Optional<ReactNode> {

    const { liveState: { liveEvent } } = this.props;

    return liveEvent !== null
      ?
      <Fragment>
        <Typography variant={"subtitle1"} color={"inherit"} noWrap>{liveEvent.name}</Typography>
        (<Typography variant={"subtitle2"} color={"inherit"} noWrap>{liveEvent.description}</Typography>)
      </Fragment>
      : null;
  }

  private renderEventControlButtons(): Optional<ReactNode> {

    const { classes, liveState: { socketConnected, rtcConnected, live }, liveActions: { startStreaming, stopStreaming }, routingState: { history } } = this.props;

    if (!/live\/.*$/.test(history.location.pathname)) {
      return null;
    }

    return (
      <Fragment>

        {
          live
            ?
            <Button variant={"outlined"} size={"small"}
                    onClick={stopStreaming}
                    disabled={!rtcConnected || !socketConnected}>
              Stop
              {(!socketConnected || !rtcConnected)
                ? <CircularProgress className={classes.connectionProgress} size={12}/>
                : <LiveTv className={classes.startIcon} fontSize={"small"}/>}
            </Button>

            : <Button variant={"outlined"} size={"small"}
                      onClick={startStreaming}
                      disabled={!rtcConnected || !socketConnected}>
              Go Live
              {(!socketConnected || !rtcConnected)
                ? <CircularProgress className={classes.connectionProgress} size={12}/>
                : <LiveTv className={classes.startIcon} fontSize={"small"}/>}
            </Button>
        }

        <IconButton
          aria-haspopup="true"
        >
          <Settings/>
        </IconButton>

      </Fragment>
    );

  }

}
