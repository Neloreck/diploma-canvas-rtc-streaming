import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Component, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// Data.
import {localMediaService} from "@Module/stream/data/services/local_media";
import {
  ILiveContext,
  IRenderingContext,
  ISourceContext,
  liveContextManager,
  sourceContextManager
} from "@Module/stream/data/store";

// View.
import {Fade, Grid, WithStyles} from "@material-ui/core";
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

export interface IStreamingPageExternalProps extends ISourceContext, IRenderingContext, ILiveContext, WithStyles<typeof streamingPageStyle> {}
export interface IStreamingPageOwnProps {}
export interface IStreamingPageProps extends IStreamingPageOwnProps, IStreamingPageExternalProps {}

@Consume<ISourceContext, IStreamingPageProps>(sourceContextManager)
@Consume<ILiveContext, IStreamingPageProps>(liveContextManager)
@Styled(streamingPageStyle)
export class StreamingPage extends Component<IStreamingPageProps, IStreamingPageState> {

  public state: IStreamingPageState = {
    mounted: true
  };

  public componentWillMount(): void {
    // Display main video on mount.
    const {sourceState: {captureVideo}, liveActions: {start: startLive}} = this.props;

    if (captureVideo) {
      this
        .getDefaultVideo()
        .then();
    }

    startLive().then();
  }

  public componentDidMount(): void {
    this.setState({ mounted: true });
  }

  public componentWillUnmount(): void {

    const {liveActions: {stop: stopLive}} = this.props;

    this.setState({ mounted: false });

    stopLive().then()
  }

  public componentWillReceiveProps(nextProps: IStreamingPageProps): void {

    // Display main related.
    const {inputStream} = this.props.sourceState;

    if (nextProps.sourceState.captureVideo !== this.props.sourceState.captureVideo) {
      if (nextProps.sourceState.captureVideo) {
        this
          .getDefaultVideo()
          .then();
      } else {
        localMediaService.killStream(inputStream);
      }
    }
  }

  public render(): ReactNode {

    const {classes} = this.props;
    const {mounted} = this.state;

    return (
      <Grid className={classes.root} direction={"column"} wrap={"nowrap"} container>

        <StreamingHeaderBar {...{} as IStreamingHeaderBarExternalProps}/>

        <Fade in={mounted}>

          <Grid className={classes.content} direction={"column"} wrap={"nowrap"} container>

            <Grid className={classes.streamingVideoSection} direction={"row"} container>
              <MainPreviewControl {...{} as IMainPreviewControlExternalProps}/>
            </Grid>

            <MainPreviewTabs {...{} as IMainPreviewTabsExternalProps}/>

          </Grid>

        </Fade>

      </Grid>
    );
  }

  @Bind()
  private async getDefaultVideo(): Promise<void> {

    const {sourceActions: {updateInputStreamAndSources}, sourceState: {captureAudio, selectedDevices}, liveActions: {connectRTC}} = this.props;
    const stream: MediaStream = await localMediaService.getUserMedia(selectedDevices.videoInput || true, captureAudio && (selectedDevices.audioInput || true));

    updateInputStreamAndSources(stream, selectedDevices);
    connectRTC().then();
  }

}
