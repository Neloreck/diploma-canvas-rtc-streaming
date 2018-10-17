import {Single} from "redux-cbd";

import {Optional} from "@Lib/ts/type";
import {Logger} from "@Lib/util/logger";

import {EDeviceKind} from "@Module/stream/data/services/local_media/EDeviceKind";
import {IInputDevicesBundle} from "@Module/stream/data/services/local_media/IInputDevicesBundle";

@Single
export class LocalMediaService {

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

    // todo: 16 x 9 resolution for media stream
    const constraints = {
      audio: { deviceId: audioInput ? {exact: audioInput.deviceId} : undefined },
      video: { deviceId: videoInput ? {exact: videoInput.deviceId} : undefined }
    };

    const stream: MediaStream = await navigator.mediaDevices.getUserMedia(constraints);

    this.log.info("Got media stream from devices:", constraints, stream);

    return stream;
  }

}
