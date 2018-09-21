import {WithStyles} from "@material-ui/core";
import {inputSourcesSelectFormStyle} from "./InputSourcesSelectForm.Style";

import {IInputSourceDevices} from "@Module/stream/data/store/input_source/store/IInputSourceDevices";

export interface IInputSourcesSelectFormExternalProps extends WithStyles<typeof inputSourcesSelectFormStyle> {
}

export interface IInputSourcesSelectFormOwnProps {
  onInputSourcesChange: (sources: IInputSourceDevices) => void;
}

export interface IInputSourcesSelectFormProps extends IInputSourcesSelectFormOwnProps, IInputSourcesSelectFormExternalProps {
}
