package com.xcore.application.initialization.database;

import com.xcore.application.authentication.models.role.EAppAccessLevel;
import com.xcore.application.authentication.models.user.AppUser;
import com.xcore.application.authentication.services.AppUserDetailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j(topic = "[📕INITIALIZATION]")
public class AuthenticationInitializer {

  @Autowired
  private AppUserDetailService appUserDetailService;

  public void initUsers() {

    log.info("initializing default users.");

    appUserDetailService.registerUser(new AppUser("frozen", "frozen@", "frozen", EAppAccessLevel.ROLE_FROZEN));
    appUserDetailService.registerUser(new AppUser("user", "user@", "user",  EAppAccessLevel.ROLE_USER));
    appUserDetailService.registerUser(new AppUser("moderator", "moderator@", "moderator", EAppAccessLevel.ROLE_MODERATOR));
    appUserDetailService.registerUser(new AppUser("admin", "admin@", "admin", EAppAccessLevel.ROLE_ADMIN));
  }

}
