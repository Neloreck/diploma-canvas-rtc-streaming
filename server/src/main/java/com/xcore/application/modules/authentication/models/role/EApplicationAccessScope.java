package com.xcore.application.modules.authentication.models.role;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum EApplicationAccessScope {

  READ("read"), WRITE("write");

  private final String scope;

  public String getScope() {
    return scope;
  }

}