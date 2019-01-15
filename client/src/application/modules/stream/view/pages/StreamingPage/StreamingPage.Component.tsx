import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Component, Fragment, ReactNode} from "react";

// Lib.
import {MediaUtils} from "@Lib/media";
import {Styled} from "@Lib/react_lib/mui";

// Api.
import {ILiveEvent} from "@Api/x-core/live/models";

// Data.
import {IRouterContext, routerContextManager} from "@Main/data/store";
import {streamConfig} from "@Module/stream/data/configs";
import {
  ILiveContext,
  IRenderingContext,
  ISourceContext,
  liveContextManager,
  sourceContextManager
} from "@Module/stream/data/store";

// View.
import {CircularProgress, Fade, Grid, WithStyles} from "@material-ui/core";
import {
  IStreamingHeaderBarExternalProps,
  StreamingHeaderBar
} from "@Module/stream/view/components/heading/StreamingHeaderBar";
import {
  IMainPreviewControlExternalProps,
  MainPreviewControl
} from "@Module/stream/view/components/preview/MainPreviewControl";
import {
  IMainPreviewTabsExternalProps,
  MainPreviewTabs
} from "@Module/stream/view/components/tabs/MainPreviewTabs";
import {streamingPageStyle} from "./StreamingPage.Style";

// Props.
export interface IStreamingPageState {
  mounted: boolean;
}

export interface IStreamingPageExternalProps extends ISourceContext, IRenderingContext, ILiveContext, IRouterContext, WithStyles<typeof streamingPageStyle> {}
export interface IStreamingPageOwnProps {}
export interface IStreamingPageProps extends IStreamingPageOwnProps, IStreamingPageExternalProps {}

@Consume(liveContextManager, routerContextManager, sourceContextManager)
@Styled(streamingPageStyle)
export class StreamingPage extends Component<IStreamingPageProps, IStreamingPageState> {

  public state: IStreamingPageState = {
    mounted: true
  };

  public componentWillMount(): void {
    this.mountComponent().then();
  }

  public async mountComponent(): Promise<void> {

    // Display main video on mount.
    const {sourceState: {captureVideo, captureAudio}, routingActions: {getLastPart, replace}, liveState: {liveEvent}, liveActions: {start: startLive, syncLiveEvent}} = this.props;

    try {
      const event: ILiveEvent = liveEvent || await syncLiveEvent(getLastPart());

      await startLive();

      if (captureAudio || captureVideo) {
        await this.getDefaultMedia();
      }

    } catch (error) {
      replace("/stream/error");
    }
  }

  public componentDidMount(): void {
    this.setState({ mounted: true });
  }

  public componentWillUnmount(): void {

    const {liveActions: {stop: stopLive}} = this.props;

    this.setState({ mounted: false });

    stopLive()
      .then();
  }

  public componentDidUpdate(previousProps: IStreamingPageProps): void {

    const {sourceState: currentState, sourceActions: {updateInputStream}} = this.props;
    const {sourceState: previousState} = previousProps;

    if (currentState.captureVideo !== previousState.captureVideo || currentState.captureAudio !== previousState.captureAudio) {
      if (currentState.captureAudio || currentState.captureVideo) {
        this.getDefaultMedia().then();
      } else {
        updateInputStream(null);
      }
    }
  }

  public render(): ReactNode {

    const {classes, liveState: {liveEvent}} = this.props;
    const {mounted} = this.state;

    return (
      <Grid className={classes.root} direction={"column"} wrap={"nowrap"} container>

        <StreamingHeaderBar {...{} as IStreamingHeaderBarExternalProps}/>

        <Fade in={mounted}>

          <Grid className={classes.content} direction={"column"} wrap={"nowrap"} container>

            {
              liveEvent !== null
                ?
                <Fragment>
                  <Grid className={classes.streamingVideoSection} direction={"row"} container>
                    <MainPreviewControl {...{} as IMainPreviewControlExternalProps}/>
                  </Grid>

                  <MainPreviewTabs {...{} as IMainPreviewTabsExternalProps}/>
                </Fragment>
                :
                <CircularProgress size={50}/>
            }

          </Grid>

        </Fade>

      </Grid>
    );
  }

  @Bind()
  private async getDefaultMedia(): Promise<void> {

    const {sourceActions: {updateInputStreamAndSources}, sourceState: {captureVideo, captureAudio, selectedDevices}} = this.props;

    const stream: MediaStream = await MediaUtils.getUserMedia(
      streamConfig.getMediaConstraints(captureVideo && (selectedDevices.videoInput || true), captureAudio && (selectedDevices.audioInput || true))
    );

    updateInputStreamAndSources(stream, selectedDevices);
  }

}
