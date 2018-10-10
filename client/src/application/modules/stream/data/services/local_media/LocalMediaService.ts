import {Single} from "redux-cbd";

import {Optional} from "@Lib/ts/type";

import {Logger} from "@Lib/util/logger";

@Single
export class LocalMediaService {

  private log: Logger = new Logger("[🕳️LMS]");

  public async getDevices(): Promise<Array<MediaDeviceInfo>>  {
    const devices: Array<MediaDeviceInfo> = await navigator.mediaDevices.enumerateDevices();
    this.log.info("Got media devices:", devices);
    return devices;
  }

  public async getAudioInputs(): Promise<Array<MediaDeviceInfo>> {
    return (await this.getDevices()).filter((device: MediaDeviceInfo) => device.kind === "audioinput");
  }

  public async getAudioOutputs(): Promise<Array<MediaDeviceInfo>> {
    return (await this.getDevices()).filter((device: MediaDeviceInfo) => device.kind === "audiooutput");
  }

  public async getVideoInputs(): Promise<Array<MediaDeviceInfo>> {
    return (await this.getDevices()).filter((device: MediaDeviceInfo) => device.kind === "videoinput");
  }

  public async getUserMedia(audioInput: Optional<MediaDeviceInfo>, videoInput: Optional<MediaDeviceInfo>) {

    const constraints = {
      audio: { deviceId: audioInput ? {exact: audioInput.deviceId} : undefined },
      video: { deviceId: videoInput ? {exact: videoInput.deviceId} : undefined }
    };

    const stream: MediaStream = await navigator.mediaDevices.getUserMedia(constraints);

    this.log.info("Got media stream from devices:", constraints, stream);

    return stream;
  }

}
