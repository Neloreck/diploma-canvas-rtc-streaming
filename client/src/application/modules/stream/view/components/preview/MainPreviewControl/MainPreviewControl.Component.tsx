import {Consume} from "@redux-cbd/context";
import * as React from "react";
import {Fragment, PureComponent, ReactNode} from "react";

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
import {Grid, WithStyles} from "@material-ui/core";
import {
  IInputSourcesConfigurationButtonExternalProps, InputSourcesConfigurationButton
} from "@Module/stream/view/components/preview/configuration_buttons/InputSourcesConfigurationButton";
import {
  IObjectAdditionTooltipExternalProps, ObjectAdditionTooltip
} from "@Module/stream/view/components/preview/configuration_buttons/ObjectAdditionButton";
import {
  IStreamingHelpButtonExternalProps, StreamingHelpButton
} from "@Module/stream/view/components/preview/configuration_buttons/StreamingHelpButton";
import {CanvasGraphicsPreprocessor} from "@Module/stream/view/components/preview/graphics_preprocessing";
import {mainPreviewControlStyle} from "./MainPreviewControl.Style";

// Props.
export interface IMainPreviewControlExternalProps extends WithStyles<typeof mainPreviewControlStyle>, IGraphicsContext, ISourceContext {}

export interface IMainPreviewControlOwnProps {}

export interface IMainPreviewControlProps extends IMainPreviewControlOwnProps, IMainPreviewControlExternalProps {}

@Consume<IGraphicsContext, IMainPreviewControlProps>(graphicsContextManager)
@Consume<ISourceContext, IMainPreviewControlProps>(sourceContextManager)
@Styled(mainPreviewControlStyle)
export class MainPreviewControl extends PureComponent<IMainPreviewControlProps> {

  // todo: Return combined stream there ready for processing.

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
    return (
      <Fragment>
        <ObjectAdditionTooltip {...{} as IObjectAdditionTooltipExternalProps}/>
        <InputSourcesConfigurationButton {...{} as IInputSourcesConfigurationButtonExternalProps}/>
        <StreamingHelpButton {...{} as IStreamingHelpButtonExternalProps}/>
      </Fragment>
    );
  }

}
