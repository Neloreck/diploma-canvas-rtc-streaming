import {WithStyles} from "@material-ui/core";

import {CanvasGraphicsRenderObject} from "@Lib/react_lib/canvas_video_graphics";

import {SetGridDisplayAction, SetPreviewModeAction} from "@Module/stream/data/store/graphics/actions";
import {IInputSourceDevices} from "@Module/stream/data/store/input_source/models/IInputSourceDevices";

import {streamingPageStyle} from "./StreamingPage.Style";

export interface IStreamPageState {
  currentTab: number;
}

export interface IStreamingPageStoreProps {
  renderObjects: Array<CanvasGraphicsRenderObject>;
  selectedDevices: IInputSourceDevices;
  showGrid: boolean;
  showPreview: boolean;
}

export interface IStreamingPageDispatchProps {
  setGridDisplay: (show: boolean) => SetGridDisplayAction;
  setPreviewMode: (show: boolean) => SetPreviewModeAction;
}

export interface IStreamingPageExternalProps extends IStreamingPageDispatchProps, IStreamingPageStoreProps,
  WithStyles<typeof streamingPageStyle> {
}

export interface IStreamingPageOwnProps {
}

export interface IStreamingPageProps extends IStreamingPageOwnProps, IStreamingPageExternalProps {
}
