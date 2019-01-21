package com.xcore.application.modules.live.exceptions.session;

public class SessionInitializationException extends AbstractSessionException {

  @Override
  public String getMessage() {
    return "Failed to initialize session";
  }

}
