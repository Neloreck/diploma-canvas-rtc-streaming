package com.xcore.application.authentication.services

import java.util.Optional

import com.xcore.application.authentication.models.role.{AppUserRole, EAppUserRoleAccessLevel, IAppUserRoleRepository}
import com.xcore.application.authentication.models.user.{AppUser, IAppUserRepository}
import org.slf4j.{Logger, LoggerFactory}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.{UserDetails, UserDetailsService, UsernameNotFoundException}
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AppUserDetailService extends UserDetailsService {

  @Autowired
  private var passwordEncoder: PasswordEncoder = _;

  @Autowired
  private var appUserRepository: IAppUserRepository = _;

  @Autowired
  private var appUserRoleRepository: IAppUserRoleRepository = _;

  private val log: Logger = LoggerFactory.getLogger("[USER DETAILS]");

  @throws[UsernameNotFoundException]
  def loadUserByUsername(login: String): UserDetails = {

    log.info(s"Searching user by login: '$login'.")

    val optionalUser: Optional[AppUser] = appUserRepository.findByLogin(login);

    if (optionalUser.isPresent) {
      log.info(s"User '$login' was.")
      optionalUser.get();
    } else {
      log.info(s"User '$login' was not found.")
      throw new UsernameNotFoundException(s"User '$login' was not found.")
    }
  }

  @throws[Exception]
  def registerUser(login: String, mail: String, password: String): AppUser = {

    val defaultRole: AppUserRole = appUserRoleRepository.findByAccessLevel(EAppUserRoleAccessLevel.ROLE_USER);
    val appUser: AppUser = new AppUser();

    appUser.setLogin(login);
    appUser.setMail(mail);
    appUser.setPassword(password);
    appUser.setRole(defaultRole);

    registerUser(appUser);
  }

  @throws[Exception]
  def registerUser(appUser: AppUser): AppUser = {

    log.info(s"Registering user: '${appUser.getUsername}'.")

    appUser.setPassword(passwordEncoder.encode(appUser.getPassword));
    appUserRepository.save(appUser);
  }

}
