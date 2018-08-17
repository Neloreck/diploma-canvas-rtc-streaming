package com.xcore.server.controller.general.api;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class ErrorResponse extends Response {

  private final Boolean success = false;
  private final List<ErrorResponseDetail> details = new ArrayList<>();

  public ErrorResponse() {
  }

  public ErrorResponse(String errorMessage) {
    this.details.add(new ErrorResponseDetail("Error", errorMessage));
  }

  public ErrorResponse(Exception ex) {
    this.details.add(new ErrorResponseDetail(ex.getClass().getTypeName(), ex.getMessage()));
  }

}
