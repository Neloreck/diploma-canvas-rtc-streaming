import {WithStyles} from "@material-ui/core";

import {CanvasGraphicsRenderObject} from "@Lib/react_lib/canvas_video_graphics";
import {Optional} from "@Lib/ts/type";

import {
  SetGraphicsDisplayAction, SetGridDisplayAction, SetPreviewModeAction
} from "@Module/stream/data/store/graphics/actions";
import {IInputSourceDevices} from "@Module/stream/data/store/source/models/IInputSourceDevices";

import {streamConfigurationPageStyle} from "./StreamConfigurationPage.Style";

export interface IStreamConfigurationPageState {
  currentTab: number;
}

export interface IStreamConfigurationPageStoreProps {
  inputStream: Optional<MediaStream>;
  renderObjects: Array<CanvasGraphicsRenderObject>;
  selectedDevices: IInputSourceDevices;
  showGraphics: boolean;
  showGrid: boolean;
  showPreview: boolean;
}

export interface IStreamConfigurationPageDispatchProps {
  setGridDisplay: (show: boolean) => SetGridDisplayAction;
  setGraphicsDisplay: (show: boolean) => SetGraphicsDisplayAction;
  setPreviewMode: (show: boolean) => SetPreviewModeAction;
}

export interface IStreamConfigurationPageExternalProps extends IStreamConfigurationPageDispatchProps, IStreamConfigurationPageStoreProps,
  WithStyles<typeof streamConfigurationPageStyle> {
}

export interface IStreamConfigurationPageOwnProps {
}

export interface IStreamConfigurationPageProps extends IStreamConfigurationPageOwnProps, IStreamConfigurationPageExternalProps {
}
