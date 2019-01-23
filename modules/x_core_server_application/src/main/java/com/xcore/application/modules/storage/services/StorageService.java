package com.xcore.application.modules.storage.services;

import com.xcore.application.modules.storage.configs.StorageConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StorageService {

  @Autowired
  private StorageConfiguration storageConfiguration;


}
