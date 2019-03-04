import { Bind, Consume } from "dreamstate";
import * as React from "react";
import { Component, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// Data.
import {
  graphicsContextManager,
  IGraphicsContext, IRenderingContext,
  ISourceContext, renderingContextManager,
  sourceContextManager
} from "@Module/stream/data/store";

// View.
import { Fab, Grid, Tooltip, WithStyles } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  IInputSourcesConfigurationButtonInjectedProps, InputSourcesConfigurationButton
} from "@Module/stream/view/components/preview/configuration_buttons/InputSourcesConfigurationButton";
import {
  IObjectAdditionButtonInjectedProps,
  ObjectAdditionButton
} from "@Module/stream/view/components/preview/configuration_buttons/ObjectAdditionButton";
import {
  ISoundControlButtonInjectedProps,
  SoundControlButton
} from "@Module/stream/view/components/preview/configuration_buttons/SoundControlButton";
import {
  IStreamingHelpButtonInjectedProps, StreamingHelpButton
} from "@Module/stream/view/components/preview/configuration_buttons/StreamingHelpButton";
import {
  IVideoControlButtonInjectedProps,
  VideoControlButton
} from "@Module/stream/view/components/preview/configuration_buttons/VideoControlButton";
import { CanvasGraphicsPreprocessor } from "@Module/stream/view/components/preview/graphics_preprocessing";
import { mainPreviewControlStyle } from "./MainPreviewControl.Style";

// Props.

export interface IMainPreviewControlState {
  showControls: boolean;
}

export interface IMainPreviewControlInjectedProps extends WithStyles<typeof mainPreviewControlStyle>, IGraphicsContext, IRenderingContext, ISourceContext {}
export interface IMainPreviewControlOwnProps {}
export interface IMainPreviewControlProps extends IMainPreviewControlOwnProps, IMainPreviewControlInjectedProps {}

@Consume(graphicsContextManager, renderingContextManager, sourceContextManager)
@Styled(mainPreviewControlStyle)
export class MainPreviewControl extends Component<IMainPreviewControlProps> {

  public state: IMainPreviewControlState = {
    showControls: true
  };

  public render(): ReactNode {

    const {
      classes,
      graphicsState: { objects }, renderingState: { showGraphics, showGrid, showPreview },
      sourceState: { inputStream, captureVideo }, sourceActions: { updateOutputStream }
    } = this.props;

    return (
      <Grid className={classes.root} justify={"center"} alignItems={"center"} container>

        <Grid className={classes.videoContainer} justify={"center"} alignItems={"center"} container>
          <CanvasGraphicsPreprocessor
            stream={inputStream}
            showMainVideo={captureVideo}
            renderingObjects={objects}
            showGrid={showGrid}
            showGraphics={showGraphics}
            showPreview={showPreview}
            onOutputStreamReady={updateOutputStream}
          >
          </CanvasGraphicsPreprocessor>
        </Grid>

        {this.renderHelpingControlTooltipButtons()}

      </Grid>
    );
  }

  private renderHelpingControlTooltipButtons(): ReactNode {

    const { classes } = this.props;
    const { showControls } = this.state;

    return (
      <>

        <Tooltip title={"Toggle controls visibility."} placement={"right"}>
          <Fab
            className={classes.controlsVisibilityButton}
            onClick={this.toggleControlsVisibility}>
            { showControls ? <Visibility/> : <VisibilityOff/> }
          </Fab>
        </Tooltip>

        { showControls
          ?
            <>
              <ObjectAdditionButton {...{} as IObjectAdditionButtonInjectedProps}/>
              <InputSourcesConfigurationButton {...{} as IInputSourcesConfigurationButtonInjectedProps}/>
              <VideoControlButton {...{} as IVideoControlButtonInjectedProps}/>
              <SoundControlButton {...{} as ISoundControlButtonInjectedProps}/>
              <StreamingHelpButton {...{} as IStreamingHelpButtonInjectedProps}/>
            </>
          :
            null
        }

      </>
    );
  }

  @Bind()
  private toggleControlsVisibility(): void {
    this.setState({ showControls: !this.state.showControls });
  }

}
