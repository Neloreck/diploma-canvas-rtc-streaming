package com.xcore.application.modules.live.exceptions;

public class SessionInitializationException extends RuntimeException {

  @Override
  public String getMessage() {
    return "Failed to initialize session";
  }

}
