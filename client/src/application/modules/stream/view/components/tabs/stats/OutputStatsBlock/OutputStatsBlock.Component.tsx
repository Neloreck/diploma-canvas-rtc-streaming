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
import {Grid, Grow, Typography, WithStyles} from "@material-ui/core";
import {Add, Remove} from "@material-ui/icons";
import {outputStatsBlockStyle} from "./OutputStatsBlock.Style";

// Props.
export interface IOutputStatsBlockState {
  showStatsConfiguration: boolean;
}

export interface IOutputStatsBlockExternalProps extends WithStyles<typeof outputStatsBlockStyle>, IGraphicsContext, ISourceContext {}
export interface IOutputStatsBlockOwnProps {}
export interface IOutputStatsBlockProps extends IOutputStatsBlockOwnProps, IOutputStatsBlockExternalProps {}

@Consume(graphicsContextManager, sourceContextManager)
@Styled(outputStatsBlockStyle)
export class OutputStatsBlock extends Component<IOutputStatsBlockProps, IOutputStatsBlockState> {

  public state: IOutputStatsBlockState = {
    showStatsConfiguration: true
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
          <Typography variant={"h6"}> Output Details </Typography>
          { showStatsConfiguration ? <Remove fontSize={"small"}/> : <Add fontSize={"small"}/>}
        </Grid>

        <Grow in={showStatsConfiguration}>

          {
            showStatsConfiguration
            ?
              <Grid container direction={"column"}>
                {this.renderOutputDetails()}
              </Grid>
            :
              <span/>
          }

        </Grow>

      </Grid>
    );
  }

  private renderOutputDetails(): ReactNode {

    const {classes, sourceState: {outputStream, inputStream}} = this.props;

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
    const audioTracks: Array<MediaStreamTrack> = (inputStream && inputStream.getAudioTracks()) || [];

    return (
      <Grid className={classes.statBlock} wrap={"nowrap"} direction={"column"} container>

        <Typography variant={"subtitle1"}> Video: </Typography>
        {videoTracks.length ? this.renderVideoTracksDetail(videoTracks[0]) : "None."}

        <br/>

        <Typography variant={"subtitle1"}> Audio: </Typography>
        {audioTracks.length ? this.renderAudioTracksDetail(audioTracks[0]) : "None."}
        <br/>

      </Grid>
    );
  }

  private renderAudioTracksDetail(mediaTrack: MediaStreamTrack): ReactNode {

    const {classes} = this.props;

    const {sampleRate}: MediaTrackSettings = mediaTrack.getSettings();

    return (
      <Grid className={classes.trackDetail} key={mediaTrack.id}>
        ID: {mediaTrack.id} <br/>
        LABEL: {mediaTrack.label} <br/>
        SAMPLE RATE: {sampleRate} <br/>
      </Grid>
    );
  }

  private renderVideoTracksDetail(mediaTrack: MediaStreamTrack): ReactNode {

    const {classes} = this.props;

    const {frameRate, aspectRatio, width, height}: MediaTrackSettings = mediaTrack.getSettings();

    return (
      <Grid className={classes.trackDetail} key={mediaTrack.id}>
        ID: {mediaTrack.id} <br/>
        STATE: {mediaTrack.readyState} <br/>
        FPS: {frameRate} <br/>
        RATIO: {aspectRatio} (16/9) <br/>
        WIDTH: {width} <br/>
        HEIGHT: {height} <br/>
      </Grid>
    );
  }

  @Bind()
  private onStatsBlockViewToggle(): void {
    this.setState({ showStatsConfiguration: !this.state.showStatsConfiguration });
  }

}
