import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Component, Fragment, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// Data.
import {
  graphicsContextManager,
  IGraphicsContext,
  ISourceContext,
  sourceContextManager
} from "@Module/stream/data/store";

// View.
import {Fab, Grid, Tooltip, WithStyles} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {
  IInputSourcesConfigurationButtonExternalProps, InputSourcesConfigurationButton
} from "@Module/stream/view/components/preview/configuration_buttons/InputSourcesConfigurationButton";
import {
  IObjectAdditionButtonExternalProps,
  ObjectAdditionButton
} from "@Module/stream/view/components/preview/configuration_buttons/ObjectAdditionButton";
import {
  ISoundControlButtonExternalProps,
  SoundControlButton
} from "@Module/stream/view/components/preview/configuration_buttons/SoundControlButton";
import {
  IStreamingHelpButtonExternalProps, StreamingHelpButton
} from "@Module/stream/view/components/preview/configuration_buttons/StreamingHelpButton";
import {
  IVideoControlButtonExternalProps,
  VideoControlButton
} from "@Module/stream/view/components/preview/configuration_buttons/VideoControlButton";
import {CanvasGraphicsPreprocessor} from "@Module/stream/view/components/preview/graphics_preprocessing";
import {mainPreviewControlStyle} from "./MainPreviewControl.Style";

// Props.

export interface IMainPreviewControlState {
  showControls: boolean;
}

export interface IMainPreviewControlExternalProps extends WithStyles<typeof mainPreviewControlStyle>, IGraphicsContext, ISourceContext {}
export interface IMainPreviewControlOwnProps {}
export interface IMainPreviewControlProps extends IMainPreviewControlOwnProps, IMainPreviewControlExternalProps {}

@Consume<IGraphicsContext, IMainPreviewControlProps>(graphicsContextManager)
@Consume<ISourceContext, IMainPreviewControlProps>(sourceContextManager)
@Styled(mainPreviewControlStyle)
export class MainPreviewControl extends Component<IMainPreviewControlProps> {

  public state: IMainPreviewControlState = {
    showControls: true
  };

  public render(): ReactNode {

    const {
      classes,
      graphicsState: {objects, showGraphics, showGrid, showPreview, showMainVideo},
      sourceState: {inputStream}, sourceActions: {updateOutputStream}
    } = this.props;

    return (
      <Grid className={classes.root} justify={"center"} alignItems={"center"} container>

        <Grid className={classes.videoContainer} justify={"center"} alignItems={"center"} container>
          <CanvasGraphicsPreprocessor
            stream={inputStream}
            showMainVideo={showMainVideo}
            renderingObjects={objects}
            showGrid={showGrid}
            showGraphics={showGraphics}
            showPreview={showPreview}
            onOutputStreamReady={updateOutputStream}
          />
        </Grid>

        {this.renderHelpingControlTooltipButtons()}

      </Grid>
    );
  }

  private renderHelpingControlTooltipButtons(): ReactNode {

    const {classes} = this.props;
    const {showControls} = this.state;

    return (
      <Fragment>

        <Tooltip title={"Toggle controls visibility."} placement={"right"}>
          <Fab
            className={classes.controlsVisibilityButton}
            onClick={this.toggleControlsVisibility}>
            { showControls ? <Visibility/> : <VisibilityOff/> }
          </Fab>
        </Tooltip>

        { showControls
          ? (
            <Fragment>
              <ObjectAdditionButton {...{} as IObjectAdditionButtonExternalProps}/>

              <InputSourcesConfigurationButton {...{} as IInputSourcesConfigurationButtonExternalProps}/>

              <VideoControlButton {...{} as IVideoControlButtonExternalProps}/>
              <SoundControlButton {...{} as ISoundControlButtonExternalProps}/>

              <StreamingHelpButton {...{} as IStreamingHelpButtonExternalProps}/>
            </Fragment>
          )
          : null
        }

      </Fragment>
    );
  }

  @Bind()
  private toggleControlsVisibility(): void {
    this.setState({ showControls: !this.state.showControls });
  }

}
