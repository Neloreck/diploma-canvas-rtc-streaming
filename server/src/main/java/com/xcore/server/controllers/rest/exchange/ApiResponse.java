package com.xcore.server.controllers.rest.exchange;

import lombok.Data;

import java.util.Date;

@Data
public abstract class ApiResponse {

  private Boolean success = true;

  private Date timeStamp = new Date();

}
