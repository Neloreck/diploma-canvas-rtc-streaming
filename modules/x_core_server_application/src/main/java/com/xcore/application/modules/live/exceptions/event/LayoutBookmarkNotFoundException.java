package com.xcore.application.modules.live.exceptions.event;

public class LayoutBookmarkNotFoundException extends Exception {

  @Override
  public String getMessage() {
    return "Failed to find requested layout bookmark.";
  }

}
