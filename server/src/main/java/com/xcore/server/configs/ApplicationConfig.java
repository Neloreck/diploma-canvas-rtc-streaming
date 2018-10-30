package com.xcore.server.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = {"com.xcore"})
public class ApplicationConfig {

  @Value("${spring.profiles.active}")
  private String STRING_PROFILES_ACTIVE;

  public EApplicationMode getApplicationMode() {
    return EApplicationMode.fromString(STRING_PROFILES_ACTIVE);
  }

}
