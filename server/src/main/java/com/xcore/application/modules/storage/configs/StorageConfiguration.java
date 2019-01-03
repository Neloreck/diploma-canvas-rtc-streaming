package com.xcore.application.modules.storage.configs;

import com.xcore.application.modules.storage.models.EStorageType;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StorageConfiguration {

  public static final EStorageType GLOBAL_STORAGE_TYPE = EStorageType.LOCAL;

}
