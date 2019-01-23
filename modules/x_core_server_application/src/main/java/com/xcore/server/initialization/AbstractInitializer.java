package com.xcore.server.initialization;

public abstract class AbstractInitializer {

  public final void proceed() {
    this.preInitialize();
    this.initialize();
    this.postInitialize();
  }

  protected void preInitialize() {
    // Placeholder.
  }

  protected abstract void initialize();

  protected void postInitialize() {
    // Placeholder.
  }

}
