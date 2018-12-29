import {IAbstractWebSocketMessage} from "@Lib/socket/IAbstractWebSocketMessage";

export enum ELiveSocketMessageType {
  CUSTOM = "CUSTOM", SDP_OFFER = "SDP_OFFER", SDP_ANSWER = "SDP_ANSWER", ICE_CANDIDATE = "ICE_CANDIDATE"
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
