package com.xcore.application.modules.live.exceptions.session;

public class SessionRecordedException extends AbstractSessionException {

  @Override
  public String getMessage() {
    return "Failed to proceed, session was already recorded.";
  }

}
