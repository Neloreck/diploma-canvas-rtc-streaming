import {Single} from "@redux-cbd/utils";

import {Optional} from "@Lib/ts/types";
import {Logger} from "@Lib/utils";

import {EDeviceKind} from "@Module/stream/data/services/local_media/EDeviceKind";
import {IInputDevicesBundle} from "@Module/stream/data/services/local_media/IInputDevicesBundle";

@Single()
export class LocalMediaService {

  private static readonly DEFAULT_VIDEO_CONSTRAINTS = {
    advanced: [
      { aspectRatio: { min: 16 / 9, exact: 16 / 9 } },
      { width: { min: 640, max: 1920 } }
    ],
    aspectRatio: { exact: 16 / 9, ideal: 16 / 9 },
    frameRate: { min: 24, ideal: 30, max: 60 },
    height: { min: 360, ideal: 720, max: 1080 }
  };

  private static readonly OUTPUT_FRAMERATE: number = 60;

  private log: Logger = new Logger("[🕳️LMS]", false);

  public async getDevices(): Promise<Array<MediaDeviceInfo>>  {
    return await navigator.mediaDevices.enumerateDevices();
  }

  public async getAudioInputs(): Promise<Array<MediaDeviceInfo>> {
    return (await this.getDevices()).filter((device: MediaDeviceInfo) => device.kind === EDeviceKind.AUDIO_INPUT);
  }

  public async getAudioOutputs(): Promise<Array<MediaDeviceInfo>> {
    return (await this.getDevices()).filter((device: MediaDeviceInfo) => device.kind === EDeviceKind.AUDIO_OUTPUT);
  }

  public async getVideoInputs(): Promise<Array<MediaDeviceInfo>> {
    return (await this.getDevices()).filter((device: MediaDeviceInfo) => device.kind === EDeviceKind.VIDEO_INPUT);
  }

  public async getInputDevicesBundled(): Promise<IInputDevicesBundle> {

    const devices: Array<MediaDeviceInfo> = await this.getDevices();

    return {
      audio: devices.filter((device: MediaDeviceInfo) => device.kind === EDeviceKind.AUDIO_INPUT),
      video: devices.filter((device: MediaDeviceInfo) => device.kind === EDeviceKind.VIDEO_INPUT)
    };
  }

  public moveTracks(to: MediaStream, from: MediaStream): void {
    this.purgeStream(to);
    from.getTracks().forEach((track) => {
      to.addTrack(track);
      from.removeTrack(track);
    });
  }

  public killStream(stream: Optional<MediaStream>): void {

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
  }

  public purgeStream(stream: MediaStream): void {
    this.killStream(stream);
    stream.getTracks().forEach((track) => stream.removeTrack(track));
  }

  public async getUserMedia(videoInput: Optional<MediaDeviceInfo> | boolean, audioInput: Optional<MediaDeviceInfo> | boolean) {

    const constraints = {
      audio:
        audioInput
          ? { deviceId: audioInput === true ? "default" : {exact: audioInput.deviceId} }
          : false,
      video:
        videoInput
        ? { ...LocalMediaService.DEFAULT_VIDEO_CONSTRAINTS, deviceId: videoInput === true ? "default" : {exact: videoInput.deviceId} }
        : false
    };

    const stream: MediaStream = await navigator.mediaDevices.getUserMedia(constraints);

    this.log.info("Got media stream from devices:", constraints, stream);

    return stream;
  }

}
