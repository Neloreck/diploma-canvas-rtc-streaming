import {WithStyles} from "@material-ui/core";

import {Optional} from "@Lib/ts/type";

import {IInputSourceDevices} from "@Module/stream/data/store/source/models/IInputSourceDevices";

import {inputSourcesSelectFormStyle} from "./InputSourcesSelectForm.Style";

export interface IInputSourcesSelectFormState {
  previewStream: Optional<MediaStream>;
  selectedInputSources: {
    audioInput: Optional<MediaDeviceInfo>,
    videoInput: Optional<MediaDeviceInfo>
  };
  audioInputSources: Array<MediaDeviceInfo>;
  videoInputSources: Array<MediaDeviceInfo>;
}

export interface IInputSourcesSelectFormExternalProps extends WithStyles<typeof inputSourcesSelectFormStyle> {
}

export interface IInputSourcesSelectFormOwnProps {
  onInputSourcesChange: (sources: IInputSourceDevices) => void;
}

export interface IInputSourcesSelectFormProps extends IInputSourcesSelectFormOwnProps, IInputSourcesSelectFormExternalProps {
}
