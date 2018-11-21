package com.xcore.server.controllers.rest.exchange;

import lombok.Getter;

@Getter
public class ErrorApiResponse extends ApiResponse {

  private final Boolean success = false;
  private ErrorApiResponseDetail error;

  public ErrorApiResponse(String errorMessage) {
    this.error = new ErrorApiResponseDetail("Error", errorMessage);
  }

  public ErrorApiResponse(Exception ex) {
    this.error = new ErrorApiResponseDetail(ex.getClass().getTypeName(), ex.getMessage());
  }

}
