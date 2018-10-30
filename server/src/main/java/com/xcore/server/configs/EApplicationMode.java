package com.xcore.server.configs;

public enum  EApplicationMode {

  DEVELOPMENT("development"), PRODUCTION("production"), UNKNOWN(null);

  private String mode;

  EApplicationMode(String mode) {
    this.mode = mode;
  }


  public static EApplicationMode fromString(String text) {
    for (EApplicationMode mode: EApplicationMode.values()) {
      if (mode.mode.equalsIgnoreCase(text)) {
        return mode;
      }
    }

    return UNKNOWN;
  }

  @Override
  public String toString() {
    return this.mode;
  }

}
