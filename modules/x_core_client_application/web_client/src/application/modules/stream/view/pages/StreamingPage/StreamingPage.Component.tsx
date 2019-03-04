import { Bind, Consume } from "dreamstate";
import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";
import { getUserMedia } from "@Lib/media";
import { log } from "@Lib/utils";

// Api.
import { ILiveEvent } from "@Api/x-core/live/models";

// Data.
import { IRouterContext, routerContextManager } from "@Main/data/store";
import { streamConfig } from "@Module/stream/data/configs/StreamConfig";
import {
  ILiveContext,
  IRenderingContext,
  ISourceContext,
  liveContextManager,
  sourceContextManager
} from "@Module/stream/data/store";

// View.
import { AnimatedMount } from "@Main/view/utils/animations/AnimatedMount";
import { CircularProgress, Grid, WithStyles } from "@material-ui/core";
import {
  IStreamingHeaderBarInjectedProps,
  StreamingHeaderBar
} from "@Module/stream/view/components/heading/StreamingHeaderBar";
import {
  IMainPreviewControlInjectedProps,
  MainPreviewControl
} from "@Module/stream/view/components/preview/MainPreviewControl";
import {
  IMainPreviewTabsInjectedProps,
  MainPreviewTabs
} from "@Module/stream/view/components/tabs";
import { streamingPageStyle } from "./StreamingPage.Style";

// Props.
export interface IStreamingPageInjectedProps extends ISourceContext, IRenderingContext, ILiveContext, IRouterContext, WithStyles<typeof streamingPageStyle> {}
export interface IStreamingPageOwnProps {}
export interface IStreamingPageProps extends IStreamingPageOwnProps, IStreamingPageInjectedProps {}

@Consume(liveContextManager, routerContextManager, sourceContextManager)
@Styled(streamingPageStyle)
export class StreamingPage extends PureComponent<IStreamingPageProps> {

  public componentWillMount(): void {
    this.mountComponent().then();
  }

  public async mountComponent(): Promise<void> {

    // Display main video on mount.
    const { sourceState: { captureVideo, captureAudio }, routingActions: { getLastPart, replace }, liveState: { liveEvent }, liveActions: { start: startLive, syncLiveEvent } } = this.props;

    try {
      const event: ILiveEvent = liveEvent || await syncLiveEvent(getLastPart());

      if (event.finished) {
        return replace(`/stream/stats/${event.id}`);
      }

      await startLive();

      if (captureAudio || captureVideo) {
        await this.getDefaultMedia();
      }

    } catch (error) {
      log.error("Failed to get live event:", error);
      replace("/stream/create");
    }
  }

  public componentWillUnmount(): void {

    const { liveActions: { stop: stopLive } } = this.props;

    stopLive()
      .then();
  }

  public componentDidUpdate(previousProps: IStreamingPageProps): void {

    const { sourceState: currentState, sourceActions: { updateInputStream } } = this.props;
    const { sourceState: previousState } = previousProps;

    if (currentState.captureVideo !== previousState.captureVideo || currentState.captureAudio !== previousState.captureAudio) {
      if (currentState.captureAudio || currentState.captureVideo) {
        this.getDefaultMedia().then();
      } else {
        updateInputStream(null);
      }
    }
  }

  public render(): ReactNode {

    const { classes, liveState: { liveEvent } } = this.props;

    return (
      <Grid className={classes.root} direction={"column"} wrap={"nowrap"} container>

        <StreamingHeaderBar {...{} as IStreamingHeaderBarInjectedProps}/>

        <AnimatedMount>

          <Grid className={classes.content} direction={"column"} wrap={"nowrap"} container>

            {
              liveEvent !== null
                ?
                <>
                  <Grid className={classes.streamingVideoSection} direction={"row"} container>
                    <MainPreviewControl {...{} as IMainPreviewControlInjectedProps}/>
                  </Grid>

                  <MainPreviewTabs {...{} as IMainPreviewTabsInjectedProps}/>
                </>
                :
                <CircularProgress size={50}/>
            }

          </Grid>

        </AnimatedMount>

      </Grid>
    );
  }

  @Bind()
  private async getDefaultMedia(): Promise<void> {

    const { sourceActions: { updateInputStreamAndSources }, sourceState: { captureVideo, captureAudio, selectedDevices } } = this.props;

    const stream: MediaStream = await getUserMedia(
      streamConfig.getMediaConstraints(captureVideo && (selectedDevices.videoInput || true), captureAudio && (selectedDevices.audioInput || true))
    );

    updateInputStreamAndSources(stream, selectedDevices);
  }

}
