import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Component, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// Data.
import {
  graphicsContextManager, IGraphicsContext, ISourceContext, sourceContextManager
} from "@Module/stream/data/store";

// View.
import {Divider, Grid, Grow, Typography, WithStyles} from "@material-ui/core";
import {Add, Remove} from "@material-ui/icons";
import {previewStatsBlockStyle} from "./PreviewStatsBlock.Style";

// Props.
export interface IPreviewStatsBlockState {
  showStatsConfiguration: boolean;
}

export interface IPreviewStatsBlockExternalProps extends WithStyles<typeof previewStatsBlockStyle>, IGraphicsContext, ISourceContext {}
export interface IPreviewStatsBlockOwnProps {}
export interface IPreviewStatsBlockProps extends IPreviewStatsBlockOwnProps, IPreviewStatsBlockExternalProps {}

@Consume<IGraphicsContext, IPreviewStatsBlockProps>(graphicsContextManager)
@Consume<ISourceContext, IPreviewStatsBlockProps>(sourceContextManager)
@Styled(previewStatsBlockStyle)
export class PreviewStatsBlock extends Component<IPreviewStatsBlockProps, IPreviewStatsBlockState> {

  public state: IPreviewStatsBlockState = {
    showStatsConfiguration: false
  };

  public render(): ReactNode {

    const {classes} = this.props;
    const {showStatsConfiguration} = this.state;

    return (
      <Grid className={classes.root} direction={"column"} wrap={"nowrap"} container>

        <Grid
          className={classes.heading}
          container justify={"space-between"} alignItems={"center"}
          onClick={this.onStatsBlockViewToggle}
        >
          <Typography variant={"h6"}> Stats </Typography>
          { showStatsConfiguration ? <Remove fontSize={"small"}/> : <Add fontSize={"small"}/>}
        </Grid>

        <Grow in={showStatsConfiguration}>

          {
            showStatsConfiguration
            ?
              <Grid container direction={"column"}>

                {this.renderInputStreamDetails()}
                {this.renderOutputStreamDetails()}

              </Grid>
            :
              <span/>
          }

        </Grow>

      </Grid>
    );
  }

  private renderInputStreamDetails(): ReactNode {

    const {classes, sourceState: {inputStream}} = this.props;

    if (inputStream === null) {
      return (
        <Grid>
          <Typography>
            No input present.
          </Typography>
        </Grid>
      );
    }

    const videoTracks: Array<MediaStreamTrack> = inputStream.getVideoTracks();
    const audioTracks: Array<MediaStreamTrack> = inputStream.getAudioTracks();

    return (
      <Grid className={classes.statBlock} wrap={"nowrap"} container>

        <Typography variant={"subtitle1"}> Input. </Typography>
        <Divider/>

        <Typography variant={"subtitle1"}> Video: </Typography>
        {videoTracks.length ? videoTracks.map((it) => this.renderTracksDetail(it)) : "None."}
        <Typography variant={"subtitle1"}> Audio: </Typography>
        {audioTracks.length ? audioTracks.map((it) => this.renderTracksDetail(it)) : "None."}

      </Grid>
    );
  }

  private renderOutputStreamDetails(): ReactNode {

    const {classes, sourceState: {outputStream}} = this.props;

    if (outputStream === null) {
      return (
        <Grid>
          <Typography>
            No output present.
          </Typography>
        </Grid>
      );
    }

    const videoTracks: Array<MediaStreamTrack> = outputStream.getVideoTracks();
    const audioTracks: Array<MediaStreamTrack> = outputStream.getAudioTracks();

    return (
      <Grid className={classes.statBlock} wrap={"nowrap"} container>

        <Typography variant={"subtitle1"}> Output. </Typography>
        <Divider/>

        <Typography variant={"subtitle1"}> Video: </Typography>
        {videoTracks.length ? videoTracks.map((it) => this.renderTracksDetail(it)) : "None."}
        <Typography variant={"subtitle1"}> Audio: </Typography>
        {audioTracks.length ? audioTracks.map((it) => this.renderTracksDetail(it)) : "None."}

      </Grid>
    );
  }

  private renderTracksDetail(mediaTrack: MediaStreamTrack): ReactNode {

    const {classes} = this.props;
    const capabilities: MediaTrackCapabilities = mediaTrack.getCapabilities();

    return (
      <Grid className={classes.trackDetail} key={mediaTrack.id}>
        [ID: {mediaTrack.id}] <br/>
        [FPS: {JSON.stringify(capabilities.frameRate)}] <br/>
        [RATIO: {JSON.stringify(capabilities.aspectRatio)}] <br/>
      </Grid>
    );
  }

  @Bind()
  private onStatsBlockViewToggle(): void {
    this.setState({ showStatsConfiguration: !this.state.showStatsConfiguration });
  }

}
