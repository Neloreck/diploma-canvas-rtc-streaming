package com.xcore.application.modules.live.exceptions;

public class EventNotFoundException extends Exception {

  @Override
  public String getMessage() {
    return "Failed to find requested live event.";
  }

}
