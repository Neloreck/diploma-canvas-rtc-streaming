package com.xcore.server.controllers.rest.exchange;

import lombok.Getter;

import java.util.Date;

public abstract class ApiRequest {

  @Getter
  private Date timeStamp;

}
