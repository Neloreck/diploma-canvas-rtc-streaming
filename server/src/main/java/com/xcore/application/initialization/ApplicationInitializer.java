package com.xcore.application.initialization;

import com.xcore.application.initialization.database.AuthenticationInitializer;
import com.xcore.server.configs.EApplicationMode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j(topic = "[📕INITIALIZATION]")

public class ApplicationInitializer {

  @Autowired
  private Environment environment;

  @Autowired
  private AuthenticationInitializer authenticationInitializer;

  public void initialize() {

    List<String> profiles = Arrays.stream(environment.getActiveProfiles()).map(String::toUpperCase).collect(Collectors.toList());

    log.info("Application initialization with profiles: {}.", profiles);

    if (profiles.contains(EApplicationMode.DEVELOPMENT.name())) {
      this.initializeDevelopment();
    } else if(profiles.contains(EApplicationMode.TESTING.name())) {
      initializeTesting();
    } else if(profiles.contains(EApplicationMode.PRODUCTION.name())) {
      initializeProduction();
    } else {
      log.info("Initialization will not execute.");
    }

  }

  private void initializeProduction() {
    // Nothing to do here.
  }

  private void initializeDevelopment() {
    this.authenticationInitializer.initUsers();
  }

  private void initializeTesting() {
    this.authenticationInitializer.initUsers();
  }

}
