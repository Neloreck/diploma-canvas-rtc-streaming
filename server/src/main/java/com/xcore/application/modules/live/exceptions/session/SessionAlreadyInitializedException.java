package com.xcore.application.modules.live.exceptions.session;

public class SessionAlreadyInitializedException extends AbstractSessionException {

  @Override
  public String getMessage() {
    return "Failed to proceed, session already initialized.";
  }

}
