package com.xcore.server.controllers.rest.exchange;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

public abstract class ApiResponse {

  @Getter
  @Setter
  private Boolean success = true;

  @Getter
  private Date timestamp = new Date();

}
