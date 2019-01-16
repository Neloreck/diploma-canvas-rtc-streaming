package com.xcore.application.modules.live.exceptions.event;

public class EventNotBelongException extends Exception {

  @Override
  public String getMessage() {
    return "Failed to proceed. Event belongs to another user.";
  }

}
