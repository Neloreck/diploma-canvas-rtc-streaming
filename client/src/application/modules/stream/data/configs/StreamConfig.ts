import {Single, TypeUtils} from "@redux-cbd/utils";

import {Optional} from "@Lib/ts/types";

@Single()
export class StreamConfig {

  private static readonly DEFAULT_VIDEO_CONSTRAINTS = {
    advanced: [
      { aspectRatio: { min: 16 / 9, exact: 16 / 9 } },
      { width: { min: 640, max: 1920 } }
    ],
    aspectRatio: { exact: 16 / 9, ideal: 16 / 9 },
    frameRate: { min: 24, ideal: 30, max: 60 },
    height: { min: 360, ideal: 720, max: 1080 }
  };

  private static readonly DESKTOP_CAPTURING_CONSTRAINT = {
    audio: false,
    video: {
      mediaSource: "screen"
    }
  };

  public getMediaConstraints(videoInput: Optional<MediaDeviceInfo> | string | boolean, audioInput: Optional<MediaDeviceInfo> | string | boolean): MediaStreamConstraints {

    return {
      audio:
        audioInput
          ? { deviceId: audioInput === true ? "default" : {exact: TypeUtils.isString(audioInput) ? audioInput as string : (audioInput as MediaDeviceInfo).deviceId} }
          : false,
      video:
        videoInput
          ? { ...StreamConfig.DEFAULT_VIDEO_CONSTRAINTS, deviceId: videoInput === true ? "default" : {exact: TypeUtils.isString(videoInput) ? videoInput as string : (videoInput as MediaDeviceInfo).deviceId}}
          : false
    };
  }

}
