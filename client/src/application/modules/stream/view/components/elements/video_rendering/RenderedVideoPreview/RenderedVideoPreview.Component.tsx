import * as React from "react";
import {Fragment, PureComponent} from "react";

import {Styled} from "@Lib/react_lib/@material_ui";
import {CanvasGraphicsPreprocessor} from "@Lib/react_lib/canvas_video_graphics";

import {Grid} from "@material-ui/core";

import {
  IStreamingHelpManagerExternalProps, StreamingHelpManager
} from "@Module/stream/view/components/elements/canvas_objects_management/StreamingHelpManager";
import {
  IInputSourcesDrawerManagerExternalProps, InputSourcesDrawerManager
} from "@Module/stream/view/components/elements/input_source/InputSourcesDrawerManager";
import {
  CanvasObjectAdditionManager, ICanvasObjectAdditionManagerExternalProps
} from "@Module/stream/view/containers/elements/CanvasObjectAdditionManager";

import {IRenderedVideoPreviewProps} from "./RenderedVideoPreview.StateProps";
import {renderedVideoPreviewStyle} from "./RenderedVideoPreview.Style";

@Styled(renderedVideoPreviewStyle)
export class RenderedVideoPreview extends PureComponent<IRenderedVideoPreviewProps> {

  // todo: Return combined stream there ready for processing.

  public render(): JSX.Element {

    const {renderObjects, showPreview, showGraphics, showGrid, stream} = this.props;

    return (
      <Grid className={this.props.classes.root} justify={"center"} alignItems={"center"} container>

        <CanvasGraphicsPreprocessor stream={stream}
                                    renderingObjects={renderObjects}
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
