import {Single} from "@redux-cbd/utils";

import {Optional} from "@Lib/ts/type";
import {Logger} from "@Lib/util/logger";

import {EDeviceKind} from "@Module/stream/data/services/local_media/EDeviceKind";
import {IInputDevicesBundle} from "@Module/stream/data/services/local_media/IInputDevicesBundle";

@Single()
export class LocalMediaService {

  private readonly DEFAULT_VIDEO_CONSTRAINTS = {
    advanced: [
      { aspectRatio: { min: 16 / 9, exact: 16 / 9 } },
      { width: { min: 640, max: 1920 } }
    ],
    aspectRatio: { exact: 16 / 9, ideal: 16 / 9 },
    frameRate: { min: 24, ideal: 30, max: 60 },
    height: { min: 360, max: 1080 }
  };

  private log: Logger = new Logger("[🕳️LMS]");

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

  public killStream(stream: Optional<MediaStream>): void {

    if (stream === null) {
      return;
    }

    if (typeof stream.getTracks === "function") {
      stream.getTracks().forEach((track) => track.stop());
      return;
    }

    if (typeof stream.getAudioTracks === "function" && typeof stream.getVideoTracks === "function") {
      stream.getAudioTracks().forEach((track) => track.stop());
      stream.getVideoTracks().forEach((track) => track.stop());
      return;
    }

    if (typeof stream.stop === "function") {
      stream.stop();
    }
  }

  public async getUserMedia(videoInput: Optional<MediaDeviceInfo>, audioInput: Optional<MediaDeviceInfo>) {

    const constraints = {
      audio: { deviceId: audioInput ? {exact: audioInput.deviceId} : undefined },
      video: {
        ...this.DEFAULT_VIDEO_CONSTRAINTS,
        deviceId: videoInput ? {exact: videoInput.deviceId} : undefined }
    };

    const stream: MediaStream = await navigator.mediaDevices.getUserMedia(constraints);

    this.log.info("Got media stream from devices:", constraints, stream);

    return stream;
  }

}
