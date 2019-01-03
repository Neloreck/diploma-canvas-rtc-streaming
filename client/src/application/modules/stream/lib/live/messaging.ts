import {IAbstractWebSocketMessage} from "@Lib/socket/IAbstractWebSocketMessage";

export enum ELiveSocketMessageType {
  CUSTOM = "CUSTOM", SDP_OFFER = "SDP_OFFER", SDP_ANSWER = "SDP_ANSWER", ICE_CANDIDATE = "ICE_CANDIDATE", STOP = "STOP"
}

export interface ILiveSocketMessage extends IAbstractWebSocketMessage {
  type: ELiveSocketMessageType;
  body: object;
}

export interface ISdpExchangeMessage extends ILiveSocketMessage {
  body: {
    sdp: string
  };
}

export interface IIceCandidateExchangeMessage extends ILiveSocketMessage {
  body: {
    iceCandidate: RTCIceCandidateInit
  };
}

export interface IErrorExchangeMessage extends ILiveSocketMessage {
  body: {
    error: string;
  };
}

export interface IStopExchangeMessage extends ILiveSocketMessage {
  body: {};
}
