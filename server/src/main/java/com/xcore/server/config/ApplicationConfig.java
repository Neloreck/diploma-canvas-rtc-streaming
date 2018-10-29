package com.xcore.server.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
@ComponentScan(basePackages = {"com.xcore"})
public class ApplicationConfig {

  @Value("${spring.profiles.active}")
  private String modeVariable;

  private List<String> developmentAllowedOrigins = Arrays.asList("http://localhost:8080", "http://localhost:3000");
  private List<String> productionAllowedOrigins = Arrays.asList();

  public EApplicationMode getApplicationMode() {
    return EApplicationMode.fromString(modeVariable);
  }

  public List<String> getAllowedOrigins() {
    return this.getApplicationMode().equals(EApplicationMode.DEVELOPMENT) ? developmentAllowedOrigins : productionAllowedOrigins;
  }

}
