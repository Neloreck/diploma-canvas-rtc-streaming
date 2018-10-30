package com.xcore.server.controllers.rest.exchange;

import lombok.Getter;

public abstract class AuthorizedApiRequest extends ApiRequest {

  @Getter
  private String authToken;

}
