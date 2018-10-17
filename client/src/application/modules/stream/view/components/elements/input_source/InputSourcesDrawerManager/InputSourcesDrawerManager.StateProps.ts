import {WithStyles} from "@material-ui/core";

import {UpdateInputStreamAndSourcesAction} from "@Module/stream/data/store/source/actions";
import {IInputSourceDevices} from "@Module/stream/data/store/source/models/IInputSourceDevices";

import {inputSourcesDrawerManagerStyle} from "./InputSourcesDrawerManager.Style";

export interface IInputSourcesDrawerManagerState {
  showDrawer: boolean;
}

export interface IInputSourcesDrawerManagerStoreProps {
}

export interface IInputSourcesDrawerManagerDispatchProps {
  onSourceStreamAndDevicesUpdate: (stream: MediaStream, devices: IInputSourceDevices) => UpdateInputStreamAndSourcesAction;
}

export interface IInputSourcesDrawerManagerExternalProps extends WithStyles<typeof inputSourcesDrawerManagerStyle>,
  IInputSourcesDrawerManagerStoreProps, IInputSourcesDrawerManagerDispatchProps{
}

export interface IInputSourcesDrawerManagerOwnProps {
}

export interface IInputSourcesDrawerManagerProps extends IInputSourcesDrawerManagerOwnProps, IInputSourcesDrawerManagerExternalProps {
}
