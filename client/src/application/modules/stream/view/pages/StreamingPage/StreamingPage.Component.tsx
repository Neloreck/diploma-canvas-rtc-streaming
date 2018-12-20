import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {PureComponent, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// Data.
import {localMediaService} from "@Module/stream/data/services/local_media";
import {graphicsContextManager, IGraphicsContext, ISourceContext, sourceContextManager} from "@Module/stream/data/store";

// View.
import {Grid, WithStyles} from "@material-ui/core";
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
export interface IStreamingPageExternalProps extends ISourceContext, IGraphicsContext, WithStyles<typeof streamingPageStyle> {}
export interface IStreamingPageOwnProps {}
export interface IStreamingPageProps extends IStreamingPageOwnProps, IStreamingPageExternalProps {}

@Consume<IGraphicsContext, IStreamingPageProps>(graphicsContextManager)
@Consume<ISourceContext, IStreamingPageProps>(sourceContextManager)
@Styled(streamingPageStyle)
export class StreamingPage extends PureComponent<IStreamingPageProps> {

  public componentWillMount(): void {
    // Display main video on mount.
    const {graphicsState: {showMainVideo}} = this.props;

    if (showMainVideo) {
      this
        .getDefaultVideo()
        .then();
    }
  }

  public componentWillReceiveProps(nextProps: IStreamingPageProps): void {

    // Display main related.
    const {inputStream} = this.props.sourceState;

    if (nextProps.graphicsState.showMainVideo !== this.props.graphicsState.showMainVideo) {
      if (nextProps.graphicsState.showMainVideo) {
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

    return (
      <Grid className={classes.root} direction={"column"} wrap={"nowrap"} container>

        <StreamingHeaderBar {...{} as IStreamingHeaderBarExternalProps}/>

        <Grid className={classes.content} direction={"column"} wrap={"nowrap"} container>

          <Grid className={classes.streamingVideoSection} direction={"row"} container>
            <MainPreviewControl {...{} as IMainPreviewControlExternalProps}/>
          </Grid>

          <MainPreviewTabs {...{} as IMainPreviewTabsExternalProps}/>

        </Grid>

      </Grid>
    );
  }

  @Bind()
  private async getDefaultVideo(): Promise<void> {

    const {sourceActions: {updateInputStreamAndSources}, sourceState: {captureAudio, selectedDevices}} = this.props;
    const stream: MediaStream = await localMediaService.getUserMedia(selectedDevices.videoInput || true, captureAudio && (selectedDevices.audioInput || true));

    updateInputStreamAndSources(stream, selectedDevices);
  }

}
