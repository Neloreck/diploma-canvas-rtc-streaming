package com.xcore.application.modules.live.exceptions.session;

public class SessionNotStartedException extends AbstractSessionException {

  @Override
  public String getMessage() {
    return "Failed to proceed, session was not started.";
  }

}
