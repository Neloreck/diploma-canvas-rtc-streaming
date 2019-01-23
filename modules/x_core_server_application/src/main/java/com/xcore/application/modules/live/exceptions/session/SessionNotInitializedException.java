package com.xcore.application.modules.live.exceptions.session;

public class SessionNotInitializedException extends AbstractSessionException {

  @Override
  public String getMessage() {
    return "Failed to proceed, session was not initialized.";
  }

}
