export enum EDeviceKind {
  AUDIO_OUTPUT = "audiooutput",
  AUDIO_INPUT = "audioinput",
  VIDEO_INPUT = "videoinput"
}

export interface IInputDevicesBundle {
  audio: Array<MediaDeviceInfo>;
  video: Array<MediaDeviceInfo>;
}

export interface IInputSourceDevices {
  videoInput: MediaDeviceInfo | null;
  audioInput: MediaDeviceInfo | null;
}
