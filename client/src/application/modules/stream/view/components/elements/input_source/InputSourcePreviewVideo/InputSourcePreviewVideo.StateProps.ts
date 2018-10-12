import {WithStyles} from "@material-ui/core";

import {CanvasGraphicsRenderObject} from "@Lib/react_lib/canvas_video_graphics";

import {IInputSourceDevices} from "@Module/stream/data/store/input_source/models/IInputSourceDevices";

import {inputSourcePreviewVideoStyle} from "./InputSourcePreviewVideo.Style";

export interface IInputSourcePreviewVideoExternalProps extends WithStyles<typeof inputSourcePreviewVideoStyle> {
}

export interface IInputSourcePreviewVideoOwnProps {
  sources: IInputSourceDevices;
  renderObjects: Array<CanvasGraphicsRenderObject>;
}

export interface IInputSourcePreviewVideoProps extends IInputSourcePreviewVideoOwnProps,
  IInputSourcePreviewVideoExternalProps {
}
