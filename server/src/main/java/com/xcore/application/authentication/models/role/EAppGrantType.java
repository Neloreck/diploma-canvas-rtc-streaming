package com.xcore.application.authentication.models.role;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public enum EAppGrantType {

  PASSWORD("password"), REFRESH_TOKEN("refresh_token"), AUTHORIZATION_CODE("authorization_code");

  private final String grantType;

  public String getType() {
    return grantType;
  }


}