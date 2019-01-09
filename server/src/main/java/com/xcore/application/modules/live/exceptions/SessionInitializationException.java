package com.xcore.application.modules.live.exceptions;

public class SessionInitializationException extends Exception {

  @Override
  public String getMessage() {
    return "Failed to initialize session";
  }

}
