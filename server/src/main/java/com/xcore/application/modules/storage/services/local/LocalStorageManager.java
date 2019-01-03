package com.xcore.application.modules.storage.services.local;

import com.xcore.application.modules.storage.services.AbstractStorageManager;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class LocalStorageManager extends AbstractStorageManager {

  private static final String STORAGE_PATH = "/tmp/xcore/";

  public static String getStoragePath() {
    return STORAGE_PATH;
  }

  @Override
  public void save(String name) {
  }

}
