package com.xcore.application.modules.live.exceptions.session;

public class SessionFinishedException extends AbstractSessionException {

  @Override
  public String getMessage() {
    return "Failed to proceed, session was finished.";
  }

}
