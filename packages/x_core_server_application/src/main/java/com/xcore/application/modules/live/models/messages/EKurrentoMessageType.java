package com.xcore.application.modules.live.models.messages;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum  EKurrentoMessageType {

  PROCESS_SDP_OFFER("PROCESS_SDP_OFFER"), ADD_ICE_CANDIDATE("ADD_ICE_CANDIDATE"),
  ICE_CANDIDATE_FOUND("ICE_CANDIDATE_FOUND"), SDP_ANSWER("SDP_ANSWER"), EXCHANGE_COMPLETED("EXCHANGE_COMPLTED"),
  RECORD_START("RECORD_START"), RECORD_STOP("RECORD_STOP"),
  STOP("STOP"), ERROR("ERROR");

  private final String type;

  public String getType() {
    return type;
  }
}
