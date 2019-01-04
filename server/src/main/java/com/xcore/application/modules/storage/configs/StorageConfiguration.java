package com.xcore.application.modules.storage.configs;

import com.xcore.application.modules.storage.models.EStorageType;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StorageConfiguration {

  public static final EStorageType GLOBAL_STORAGE_TYPE = EStorageType.LOCAL;

  @Value("${xcore.storage.location}")
  private String localStorageLocation;

  public String getStreamsStorageLocation() {
    return StringUtils.strip(this.localStorageLocation, "\"") + "streams/";
  }

}
