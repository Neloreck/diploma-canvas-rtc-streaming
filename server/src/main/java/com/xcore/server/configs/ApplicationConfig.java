package com.xcore.server.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Configuration
@ComponentScan(basePackages = {"com.xcore"})
public class ApplicationConfig {

  @Value("${spring.profiles.active}")
  private String STRING_PROFILES_ACTIVE;

  public EApplicationMode getApplicationMode() {
    return EApplicationMode.fromString(STRING_PROFILES_ACTIVE);
  }

  public List<String> getAllowedOrigins() {

    if (getApplicationMode().equals(EApplicationMode.DEVELOPMENT)) {
      return Collections.singletonList("http://localhost");
    } else {
      return new ArrayList<>();
    }
  }

}
