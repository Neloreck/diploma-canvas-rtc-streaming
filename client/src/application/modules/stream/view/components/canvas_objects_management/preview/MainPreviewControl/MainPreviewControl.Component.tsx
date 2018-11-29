import {Consume} from "@redux-cbd/context";
import * as React from "react";
import {Fragment, PureComponent} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/@material_ui";

// Data.
import {
  graphicsContextManager,
  IGraphicsContext,
  ISourceContext,
  sourceContextManager
} from "@Module/stream/data/store";

// View.
import {Grid, WithStyles} from "@material-ui/core";
import {CanvasGraphicsPreprocessor} from "@Module/stream/view/components/canvas_objects_management/preview/canvas_graphics_preprocessing";
import {CanvasObjectAdditionButtonTooltip, ICanvasObjectAdditionButtonTooltipExternalProps} from "@Module/stream/view/components/canvas_objects_management/preview/preview_configuration_buttons/CanvasObjectAdditionButtonTooltip";
import {IInputSourcesDrawerButtonTooltipExternalProps, InputSourcesDrawerButtonTooltip} from "@Module/stream/view/components/canvas_objects_management/preview/preview_configuration_buttons/InputSourcesDrawerButtonTooltip";
import {IStreamingHelpButtonTooltipExternalProps, StreamingHelpButtonTooltip} from "@Module/stream/view/components/canvas_objects_management/preview/preview_configuration_buttons/StreamingHelpButtonTooltip";
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

  public render(): JSX.Element {

    const {
      classes,
      graphicsState: {objects, showGraphics, showGrid, showPreview, showMainVideo},
      sourceState: {inputStream}, sourceActions: {updateOutputStream}
    } = this.props;

    return (
      <Grid className={classes.root} justify={"center"} alignItems={"center"} container>

        <CanvasGraphicsPreprocessor
          stream={inputStream}
          showMainVideo={showMainVideo}
          renderingObjects={objects}
          showGrid={showGrid}
          showGraphics={showGraphics}
          showPreview={showPreview}
          onOutputStreamReady={updateOutputStream}
        />

        {this.renderHelpingControlTooltipButtons()}

      </Grid>
    );
  }

  private renderHelpingControlTooltipButtons(): JSX.Element {
    return (
      <Fragment>
        <CanvasObjectAdditionButtonTooltip {...{} as ICanvasObjectAdditionButtonTooltipExternalProps}/>
        <InputSourcesDrawerButtonTooltip {...{} as IInputSourcesDrawerButtonTooltipExternalProps}/>
        <StreamingHelpButtonTooltip {...{} as IStreamingHelpButtonTooltipExternalProps}/>
      </Fragment>
    );
  }

}
