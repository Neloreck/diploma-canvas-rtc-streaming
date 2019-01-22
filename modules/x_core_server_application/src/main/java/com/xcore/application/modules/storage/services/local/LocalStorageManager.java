package com.xcore.application.modules.storage.services.local;

import com.xcore.application.modules.storage.services.AbstractStorageManager;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Configuration;

@NoArgsConstructor
@Configuration
public class LocalStorageManager extends AbstractStorageManager {

  @Override
  public void save(String name) {
  }

}
