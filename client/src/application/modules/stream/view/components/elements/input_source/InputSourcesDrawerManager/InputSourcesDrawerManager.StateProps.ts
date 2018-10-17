import {WithStyles} from "@material-ui/core";
import {inputSourcesDrawerManagerStyle} from "./InputSourcesDrawerManager.Style";

export interface IInputSourcesDrawerManagerState {
  showModal: boolean;
}

export interface IInputSourcesDrawerManagerExternalProps extends WithStyles<typeof inputSourcesDrawerManagerStyle> {
}

export interface IInputSourcesDrawerManagerOwnProps {
}

export interface IInputSourcesDrawerManagerProps extends IInputSourcesDrawerManagerOwnProps, IInputSourcesDrawerManagerExternalProps {
}
