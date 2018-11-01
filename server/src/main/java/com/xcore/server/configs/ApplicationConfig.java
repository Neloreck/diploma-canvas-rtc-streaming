package com.xcore.server.configs;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = {"com.xcore"})
public class ApplicationConfig {

  private static String AUTH_SIGNING_KEY = "SIGNING-KEY";

  @Value("${spring.profiles.active}")
  private String STRING_PROFILES_ACTIVE;

  public EApplicationMode getApplicationMode() {
    return EApplicationMode.fromString(STRING_PROFILES_ACTIVE);
  }

  public String getAuthSigningKey() {
    return AUTH_SIGNING_KEY;
  }

}
