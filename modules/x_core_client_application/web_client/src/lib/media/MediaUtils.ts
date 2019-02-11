import { EDeviceKind, IInputDevicesBundle } from "./types";

export const getDevices = async (): Promise<Array<MediaDeviceInfo>> =>
  await navigator.mediaDevices.enumerateDevices();

export const getAudioInputs = async (): Promise<Array<MediaDeviceInfo>> =>
  (await getDevices()).filter((device: MediaDeviceInfo) => device.kind === EDeviceKind.AUDIO_INPUT);

export const getAudioOutputs = async (): Promise<Array<MediaDeviceInfo>> =>
  (await getDevices()).filter((device: MediaDeviceInfo) => device.kind === EDeviceKind.AUDIO_OUTPUT);

export const getVideoInputs = async (): Promise<Array<MediaDeviceInfo>> =>
  (await getDevices()).filter((device: MediaDeviceInfo) => device.kind === EDeviceKind.VIDEO_INPUT);

export const getInputDevicesBundled = async (): Promise<IInputDevicesBundle> => {

  const devices: Array<MediaDeviceInfo> = await getDevices();

  return {
    audio: devices.filter((device: MediaDeviceInfo) => device.kind === EDeviceKind.AUDIO_INPUT),
    video: devices.filter((device: MediaDeviceInfo) => device.kind === EDeviceKind.VIDEO_INPUT)
  };
};

export const moveTracks = (to: MediaStream, from: MediaStream): void => {

  const oldTracks: Array<MediaStreamTrack> = to.getTracks();

  from.getTracks().forEach((track: MediaStreamTrack): void => {
    to.addTrack(track);
    from.removeTrack(track);
  });

  killStream(from);

  oldTracks.forEach((track: MediaStreamTrack): void => {
    to.removeTrack(track);
    track.stop();
  });
};

export const killStream = (stream: MediaStream | null): void => {

  if (stream === null) {
    return;
  }

  if (typeof stream.getTracks === "function") {
    stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
    return;
  }

  if (typeof stream.getAudioTracks === "function" && typeof stream.getVideoTracks === "function") {
    stream.getAudioTracks().forEach((track: MediaStreamTrack) => track.stop());
    stream.getVideoTracks().forEach((track: MediaStreamTrack) => track.stop());
    return;
  }

  if (typeof stream.stop === "function") {
    stream.stop();
  }
};

export const setStreamAudioEnabled = (stream: MediaStream, enabled: boolean): void =>
  stream.getAudioTracks().forEach((track: MediaStreamTrack) => track.enabled = enabled);

export const purgeStream = (stream: MediaStream): void => {
  killStream(stream);
  stream.getTracks().forEach((track: MediaStreamTrack): void => stream.removeTrack(track));
};

export const getUserMedia = async (constraints: MediaStreamConstraints): Promise<MediaStream> =>
  await navigator.mediaDevices.getUserMedia(constraints);
