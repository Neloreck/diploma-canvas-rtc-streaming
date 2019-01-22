package com.xcore.application.modules.live.exceptions.session;

public class SessionAlreadyStartedException extends AbstractSessionException {

  @Override
  public String getMessage() {
    return "Failed to proceed, session already started.";
  }

}
