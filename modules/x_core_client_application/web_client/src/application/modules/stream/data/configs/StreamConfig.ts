// Lib.
import { Optional } from "@Lib/ts/types";

export const streamConfig = {

  DEFAULT_VIDEO_CONSTRAINTS: {
    advanced: [
      { aspectRatio: { min: 16 / 9, exact: 16 / 9 } },
      { width: { min: 640, max: 1920 } }
    ],
    aspectRatio: { exact: 16 / 9, ideal: 16 / 9 },
    frameRate: { min: 24, ideal: 30, max: 60 },
    height: { min: 360, ideal: 720, max: 1080 }
  },

  DESKTOP_CAPTURING_CONSTRAINT: {
    audio: false,
    video: {}
  },

  SERVER_LIVE_SOCKET_URL: (process.env.X_CORE__API_SERVER_URL as string) + "/websocket/live",

  VIDEO: {
    DEFAULT_CAPTURING_FRAMERATE: 60,
    DEFAULT_RENDERING_RESOLUTION: { width: 1280, height: 720 },
    DEFAULT_SCALE: 16 / 9
  },

  getMediaConstraints(
    videoInput: Optional<MediaDeviceInfo> | string | boolean,
    audioInput: Optional<MediaDeviceInfo> | string | boolean
  ): MediaStreamConstraints {

    return {
      audio:
        audioInput
          ?
            {
              deviceId: audioInput === true
                ? "default"
                : { exact: typeof audioInput === "string" ? audioInput as string : (audioInput as MediaDeviceInfo).deviceId }
            }
          :
            false,
      video:
        videoInput
          ?
            {
              ...this.DEFAULT_VIDEO_CONSTRAINTS,
              deviceId: videoInput === true
                ? "default"
                : { exact: typeof videoInput === "string"  ? videoInput as string : (videoInput as MediaDeviceInfo).deviceId }
            }
          :
            false
    };
  }

};
