package com.xcore.server.controllers.rest.exchange;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class ErrorApiResponse extends ApiResponse {

  private final Boolean success = false;
  private final List<ErrorApiResponseDetail> details = new ArrayList<>();

  public ErrorApiResponse() {
  }

  public ErrorApiResponse(String errorMessage) {
    this.details.add(new ErrorApiResponseDetail("Error", errorMessage));
  }

  public ErrorApiResponse(Exception ex) {
    this.details.add(new ErrorApiResponseDetail(ex.getClass().getTypeName(), ex.getMessage()));
  }

}
