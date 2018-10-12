import {WithStyles} from "@material-ui/core";

import {CanvasGraphicsRenderObject} from "@Lib/react_lib/canvas_video_graphics";

import {ChangeSelectedMediaDevicesAction} from "@Module/stream/data/store/input_source/actions";
import {IInputSourceDevices} from "@Module/stream/data/store/input_source/models/IInputSourceDevices";

import {streamingPageStyle} from "./StreamingPage.Style";

export interface IStreamingPageStoreProps {
  renderObjects: Array<CanvasGraphicsRenderObject>;
  selectedDevices: IInputSourceDevices;
}

export interface IStreamingPageDispatchProps {
  changeInputSources: (sources: IInputSourceDevices) => ChangeSelectedMediaDevicesAction;
}

export interface IStreamingPageExternalProps extends IStreamingPageDispatchProps, IStreamingPageStoreProps,
  WithStyles<typeof streamingPageStyle> {
}

export interface IStreamingPageOwnProps {
}

export interface IStreamingPageProps extends IStreamingPageOwnProps, IStreamingPageExternalProps {
}
