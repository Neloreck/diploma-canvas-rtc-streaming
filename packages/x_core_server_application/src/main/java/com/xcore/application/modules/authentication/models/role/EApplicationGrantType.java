package com.xcore.application.modules.authentication.models.role;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum EApplicationGrantType {

  PASSWORD("password"), IMPLICIT("implicit"), REFRESH_TOKEN("refresh_token"), AUTHORIZATION_CODE("authorization_code"), CLIENT_CREDENTIALS("client_credentials");

  private final String grantType;

  public String getType() {
    return grantType;
  }

}