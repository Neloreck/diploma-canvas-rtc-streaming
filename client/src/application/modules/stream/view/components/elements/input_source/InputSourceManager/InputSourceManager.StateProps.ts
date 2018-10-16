import {WithStyles} from "@material-ui/core";
import {inputSourceManagerStyle} from "./InputSourceManager.Style";

export interface IInputSourceManagerState {
  showModal: boolean;
}

export interface IInputSourceManagerExternalProps extends WithStyles<typeof inputSourceManagerStyle> {
}

export interface IInputSourceManagerOwnProps {
}

export interface IInputSourceManagerProps extends IInputSourceManagerOwnProps, IInputSourceManagerExternalProps {
}
