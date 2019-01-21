package com.xcore.application.modules.live.exceptions.session;

public class SessionDisposedException extends AbstractSessionException {

  @Override
  public String getMessage() {
    return "Failed to proceed, session was disposed.";
  }

}
