package com.xcore.server.controllers.rest.exchange;

import lombok.Getter;

@Getter
public class ErrorApiResponse extends ApiResponse {

  private final Boolean success = false;
  private ErrorApiResponseDetail detail;

  public ErrorApiResponse(String errorMessage) {
    this.detail = new ErrorApiResponseDetail("Error", errorMessage);
  }

  public ErrorApiResponse(Exception ex) {
    this.detail = new ErrorApiResponseDetail(ex.getClass().getTypeName(), ex.getMessage());
  }

}
