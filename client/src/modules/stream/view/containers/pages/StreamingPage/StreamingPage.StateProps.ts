import {WithStyles} from "@material-ui/core";
import {streamingPageStyle} from "./StreamingPage.Style";

import {ChangeSelectedMediaDevicesAction} from "@Module/stream/data/store/input_source/actions";
import {IInputSourceDevices} from "@Module/stream/data/store/input_source/store/IInputSourceDevices";

export interface IStreamingPageStoreProps {
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
