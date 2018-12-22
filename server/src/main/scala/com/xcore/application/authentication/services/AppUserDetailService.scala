package com.xcore.application.authentication.services

import java.util.Optional

import com.xcore.application.authentication.configs.WebSecurityOptions
import com.xcore.application.authentication.models.role.EAppAccessLevel
import com.xcore.application.authentication.models.user.{AppUser, IAppUserRepository}
import org.slf4j.{Logger, LoggerFactory}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.{UserDetails, UserDetailsService, UsernameNotFoundException}
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AppUserDetailService extends UserDetailsService {

  private val log: Logger = LoggerFactory.getLogger("[🔒UDS]");

  @Autowired
  private var webSecurityOptions: WebSecurityOptions = _;

  @Autowired
  private var passwordEncoder: PasswordEncoder = _;

  @Autowired
  private var appUserRepository: IAppUserRepository = _;


  def userExists(username: String): Boolean = appUserRepository.findByUsername(username).isPresent;

  def userWithMailExists(email: String): Boolean = appUserRepository.findByMail(email).isPresent;

  def loadUserById(id: Long): Optional[AppUser] = appUserRepository.findById(id);

  @throws[UsernameNotFoundException]
  def loadUserByUsername(username: String): UserDetails = {

    val optionalUser: Optional[AppUser] = appUserRepository.findByUsername(username);

    if (optionalUser.isPresent) {
      log.info(s"User '$username' was found.")
      optionalUser.get();
    } else {
      log.info(s"User '$username' was not found.")
      throw new UsernameNotFoundException(s"User '$username' was not found.")
    }
  }


  @throws[Exception]
  def registerUser(username: String, mail: String, password: String): AppUser = {

    val appUser: AppUser = new AppUser();

    appUser.setUsername(username);
    appUser.setMail(mail);
    appUser.setPassword(passwordEncoder.encode(password));
    appUser.setRole(EAppAccessLevel.ROLE_USER);

    log.info(s"Registering user: '${appUser.getUsername}'.")

    appUserRepository.save(appUser);
  }

  def registerUser(appUser: AppUser): AppUser = {

    log.info(s"Registering user: '${appUser.getUsername}'.")

    appUser.setPassword(passwordEncoder.encode(appUser.getPassword));

    appUserRepository.save(appUser);
  }

}
