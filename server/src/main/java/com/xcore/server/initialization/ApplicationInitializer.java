package com.xcore.server.initialization;

import com.xcore.server.initialization.database.AuthenticationInitializer;
import com.xcore.server.models.EApplicationMode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j(topic = "[📕INITIALIZATION]")

public class ApplicationInitializer extends AbstractInitializer {

  @Autowired
  private Environment environment;

  @Autowired
  private AuthenticationInitializer authenticationInitializer;

  @Override
  protected void preInitialize() {
    log.info("Application initialization with profiles: {}.", (Object) environment.getActiveProfiles());
  }

  @Override
  protected void initialize() {

    List<String> profiles = Arrays.stream(environment.getActiveProfiles()).map(String::toUpperCase).collect(Collectors.toList());

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

  @Override
  protected void postInitialize() {
    log.info("Application initialization finished.");
  }

  /*
   * Profiles related.
   */

  private void initializeProduction() {
    // Nothing to do there.
  }

  private void initializeDevelopment() {
    this.authenticationInitializer.initUsers();
  }

  private void initializeTesting() {
    this.authenticationInitializer.initUsers();
  }

}
