import {Consume} from "@redux-cbd/context";
import * as React from "react";
import {Fragment, PureComponent, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// Data.
import {IRouterContext, routerContextManager} from "@Main/data/store";
import {ILiveContext, liveContextManager} from "@Module/stream/data/store";

// Api.

// View.
import {AnimatedMount} from "@Main/view/utils/animations/AnimatedMount";
import {Grid, WithStyles} from "@material-ui/core";
import {
  IStreamingHeaderBarExternalProps,
  StreamingHeaderBar
} from "@Module/stream/view/components/heading/StreamingHeaderBar";
import {streamStatsPageStyle} from "./StreamStatsPage.Style";
import {ILiveEvent} from "@Api/x-core";

// Props.
export interface IStreamStatsPageExternalProps extends WithStyles<typeof streamStatsPageStyle> {}
export interface IStreamStatsPageOwnProps {}
export interface IStreamStatsPageProps extends IStreamStatsPageOwnProps, IStreamStatsPageExternalProps, ILiveContext, IRouterContext {}

@Consume(routerContextManager, liveContextManager)
@Styled(streamStatsPageStyle)
export class StreamStatsPage extends PureComponent<IStreamStatsPageProps> {

  public componentWillMount(): void {
    this.mountComponent().then();
  }

  public async mountComponent(): Promise<void> {

    const {liveState: {liveEvent}, liveActions: {syncLiveEvent}, routingActions: {getLastPart, replace}} = this.props;

    const currentEvent: ILiveEvent = liveEvent || await syncLiveEvent(getLastPart());

    if (!currentEvent) {
      replace("/stream/create");
    } else if (!currentEvent.finished) {
      replace("/stream/live");
    }
  }

  public render(): ReactNode {

    const {classes} = this.props;

    return (
      <Grid className={classes.root} direction={"column"} wrap={"nowrap"} container>
        {this.renderContent()}
      </Grid>
    );
  }

  private renderContent(): ReactNode {

    const {classes} = this.props;

    return (
      <Fragment>

        <StreamingHeaderBar {...{} as IStreamingHeaderBarExternalProps}/>

        <AnimatedMount>

          <Grid className={classes.content} direction={"column"} wrap={"nowrap"} alignItems={"center"} justify={"center"} container>

            Stream Stats.

          </Grid>

        </AnimatedMount>

      </Fragment>
    );
  }

}
