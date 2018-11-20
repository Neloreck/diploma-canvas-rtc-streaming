import {Consume} from "@redux-cbd/context";
import * as React from "react";
import {Fragment, PureComponent} from "react";

import {Styled} from "@Lib/react_lib/@material_ui";
import {CanvasGraphicsPreprocessor} from "@Lib/react_lib/canvas_video_graphics";
import {Optional} from "@Lib/ts/type";

import {Grid, WithStyles} from "@material-ui/core";

import {graphicsContext, IGraphicsContextState} from "@Module/stream/data/store";
import {IStreamingHelpManagerExternalProps, StreamingHelpManager} from "@Module/stream/view/components/canvas_objects_management/StreamingHelpManager/index";
import {IInputSourcesDrawerManagerExternalProps, InputSourcesDrawerManager} from "@Module/stream/view/components/input_source/InputSourcesDrawerManager";
import {CanvasObjectAdditionManager, ICanvasObjectAdditionManagerExternalProps} from "@Module/stream/view/containers/CanvasObjectAdditionManager";

import {renderedVideoPreviewStyle} from "./RenderedVideoPreview.Style";

export interface IRenderedVideoPreviewExternalProps extends WithStyles<typeof renderedVideoPreviewStyle>, IGraphicsContextState {}

export interface IRenderedVideoPreviewOwnProps {
  stream: Optional<MediaStream>;
}

export interface IRenderedVideoPreviewProps extends IRenderedVideoPreviewOwnProps, IRenderedVideoPreviewExternalProps {}

@Consume<IGraphicsContextState, IRenderedVideoPreviewProps>(graphicsContext)
@Styled(renderedVideoPreviewStyle)
export class RenderedVideoPreview extends PureComponent<IRenderedVideoPreviewProps> {

  // todo: Return combined stream there ready for processing.

  public render(): JSX.Element {

    const {graphicsState: {objects, showGraphics, showGrid, showPreview}, stream} = this.props;

    return (
      <Grid className={this.props.classes.root} justify={"center"} alignItems={"center"} container>

        <CanvasGraphicsPreprocessor
          stream={stream}
          renderingObjects={objects}
          showGrid={showGrid}
          showGraphics={showGraphics}
          showPreview={showPreview}
          />

        {this.renderHelperManagers()}

      </Grid>
    );
  }

  private renderHelperManagers(): JSX.Element {
    return (
      <Fragment>
        <CanvasObjectAdditionManager {...{} as ICanvasObjectAdditionManagerExternalProps}/>
        <InputSourcesDrawerManager {...{} as IInputSourcesDrawerManagerExternalProps}/>
        <StreamingHelpManager {...{} as IStreamingHelpManagerExternalProps}/>
      </Fragment>
    );
  }

}
