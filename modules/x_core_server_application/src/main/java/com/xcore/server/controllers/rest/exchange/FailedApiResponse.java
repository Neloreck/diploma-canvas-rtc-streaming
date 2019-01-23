package com.xcore.server.controllers.rest.exchange;

import lombok.Getter;

@Getter
public class FailedApiResponse extends ApiResponse {

  private final Boolean success = false;
  private FailedApiResponseDetail error;

  public FailedApiResponse(String errorMessage) {
    this.error = new FailedApiResponseDetail("Error", errorMessage);
  }

  public FailedApiResponse(String type, String errorMessage) {
    this.error = new FailedApiResponseDetail(type, errorMessage);
  }

  public FailedApiResponse(Exception ex) {

    final String[] parts = ex.getClass().getTypeName().split("\\.");

    this.error = new FailedApiResponseDetail(parts[parts.length - 1], ex.getMessage());
  }

}
