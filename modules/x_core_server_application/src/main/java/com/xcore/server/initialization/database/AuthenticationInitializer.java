package com.xcore.server.initialization.database;

import com.xcore.application.modules.authentication.models.role.EApplicationAccessLevel;
import com.xcore.application.modules.authentication.models.user.ApplicationUser;
import com.xcore.application.modules.authentication.services.ApplicationUserDetailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j(topic = "[📕INITIALIZATION]")
public class AuthenticationInitializer {

  @Autowired
  private ApplicationUserDetailService appUserDetailService;

  public void initUsers() {

    log.info("initializing default users.");

    appUserDetailService.registerUser(new ApplicationUser("frozen", "frozen@", "frozen", EApplicationAccessLevel.ROLE_FROZEN));
    appUserDetailService.registerUser(new ApplicationUser("user", "user@", "user",  EApplicationAccessLevel.ROLE_USER));
    appUserDetailService.registerUser(new ApplicationUser("moderator", "moderator@", "moderator", EApplicationAccessLevel.ROLE_MODERATOR));
    appUserDetailService.registerUser(new ApplicationUser("admin", "admin@", "admin", EApplicationAccessLevel.ROLE_ADMIN));
  }

}
