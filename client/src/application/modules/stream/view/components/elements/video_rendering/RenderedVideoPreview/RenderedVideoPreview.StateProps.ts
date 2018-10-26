import {WithStyles} from "@material-ui/core";

import {CanvasGraphicsRenderObject} from "@Lib/react_lib/canvas_video_graphics";
import {Optional} from "@Lib/ts/type";

import {renderedVideoPreviewStyle} from "./RenderedVideoPreview.Style";

export interface IRenderedVideoPreviewExternalProps extends WithStyles<typeof renderedVideoPreviewStyle> {
}

export interface IRenderedVideoPreviewOwnProps {
  stream: Optional<MediaStream>;
  renderObjects: Array<CanvasGraphicsRenderObject>;
  showGraphics: boolean;
  showGrid: boolean;
  showPreview: boolean;
}

export interface IRenderedVideoPreviewProps extends IRenderedVideoPreviewOwnProps, IRenderedVideoPreviewExternalProps {
}
