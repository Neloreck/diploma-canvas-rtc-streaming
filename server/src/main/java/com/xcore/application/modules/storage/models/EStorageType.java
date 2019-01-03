package com.xcore.application.modules.storage.models;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum  EStorageType {

  LOCAL("LOCAL");

  private final String type;

  public String getType() {
    return type;
  }

}
