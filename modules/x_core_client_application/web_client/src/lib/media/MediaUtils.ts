import { EDeviceKind, IInputDevicesBundle } from "./types";

export class MediaUtils {

  public static async getDevices(): Promise<Array<MediaDeviceInfo>>  {
    return await navigator.mediaDevices.enumerateDevices();
  }

  public static async getAudioInputs(): Promise<Array<MediaDeviceInfo>> {
    return (await this.getDevices()).filter((device: MediaDeviceInfo) => device.kind === EDeviceKind.AUDIO_INPUT);
  }

  public static async getAudioOutputs(): Promise<Array<MediaDeviceInfo>> {
    return (await this.getDevices()).filter((device: MediaDeviceInfo) => device.kind === EDeviceKind.AUDIO_OUTPUT);
  }

  public static async getVideoInputs(): Promise<Array<MediaDeviceInfo>> {
    return (await this.getDevices()).filter((device: MediaDeviceInfo) => device.kind === EDeviceKind.VIDEO_INPUT);
  }

  public static async getInputDevicesBundled(): Promise<IInputDevicesBundle> {

    const devices: Array<MediaDeviceInfo> = await this.getDevices();

    return {
      audio: devices.filter((device: MediaDeviceInfo) => device.kind === EDeviceKind.AUDIO_INPUT),
      video: devices.filter((device: MediaDeviceInfo) => device.kind === EDeviceKind.VIDEO_INPUT)
    };
  }

  public static moveTracks(to: MediaStream, from: MediaStream): void {

    const oldTracks: Array<MediaStreamTrack> = to.getTracks();

    from.getTracks().forEach((track: MediaStreamTrack): void => {
      to.addTrack(track);
      from.removeTrack(track);
    });

    this.killStream(from);

    oldTracks.forEach((track: MediaStreamTrack): void => {
      to.removeTrack(track);
      track.stop();
    });
  }

  public static killStream(stream: MediaStream | null): void {

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

  public static setStreamAudioEnabled(stream: MediaStream, enabled: boolean): void {
    stream.getAudioTracks().forEach((track: MediaStreamTrack) => track.enabled = enabled);
  }

  public static purgeStream(stream: MediaStream): void {
    this.killStream(stream);
    stream.getTracks().forEach((track: MediaStreamTrack): void => stream.removeTrack(track));
  }

  public static async getUserMedia(constraints: MediaStreamConstraints): Promise<MediaStream> {
    return await navigator.mediaDevices.getUserMedia(constraints);
  }

}
