package com.xcore.application.modules.live.exceptions.session;

public class SessionAlreadyRecordingException extends AbstractSessionException {

  @Override
  public String getMessage() {
    return "Failed to proceed, session already recording.";
  }

}
