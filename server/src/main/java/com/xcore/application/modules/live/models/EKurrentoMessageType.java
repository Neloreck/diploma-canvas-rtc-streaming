package com.xcore.application.modules.live.models;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum  EKurrentoMessageType {

  PROCESS_SDP_OFFER("PROCESS_SDP_OFFER"), ADD_ICE_CANDIDATE("ADD_ICE_CANDIDATE"), STOP("STOP"), ERROR("ERROR");

  private final String message;

  public String getType() {
    return message;
  }
}
