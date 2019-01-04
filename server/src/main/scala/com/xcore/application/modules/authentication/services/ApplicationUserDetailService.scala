package com.xcore.application.modules.authentication.services

import java.util.Optional

import com.xcore.application.modules.authentication.configs.WebSecurityOptions
import com.xcore.application.modules.authentication.models.role.EAppAccessLevel
import com.xcore.application.modules.authentication.models.user.{ApplicationUser, IApplicationUserRepository}
import org.slf4j.{Logger, LoggerFactory}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.{UserDetails, UserDetailsService, UsernameNotFoundException}
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class ApplicationUserDetailService extends UserDetailsService {

  private val log: Logger = LoggerFactory.getLogger("[🔒UDS]");

  @Autowired
  private var webSecurityOptions: WebSecurityOptions = _;

  @Autowired
  private var passwordEncoder: PasswordEncoder = _;

  @Autowired
  private var appUserRepository: IApplicationUserRepository = _;


  def userExists(username: String): Boolean = appUserRepository.findByUsername(username).isPresent;

  def userWithMailExists(email: String): Boolean = appUserRepository.findByMail(email).isPresent;

  def loadUserById(id: Long): Optional[ApplicationUser] = appUserRepository.findById(id);

  @throws[UsernameNotFoundException]
  def loadUserByUsername(username: String): UserDetails = {

    val optionalUser: Optional[ApplicationUser] = appUserRepository.findByUsername(username);

    if (optionalUser.isPresent) {
      optionalUser.get();
    } else {
      throw new UsernameNotFoundException(s"User '$username' was not found.")
    }
  }


  @throws[Exception]
  def registerUser(username: String, mail: String, password: String): ApplicationUser = {

    val appUser: ApplicationUser = new ApplicationUser();

    appUser.setUsername(username);
    appUser.setMail(mail);
    appUser.setPassword(passwordEncoder.encode(password));
    appUser.setRole(EAppAccessLevel.ROLE_USER);

    appUserRepository.save(appUser);
  }

  def registerUser(appUser: ApplicationUser): ApplicationUser = {

    appUser.setPassword(passwordEncoder.encode(appUser.getPassword));
    appUserRepository.save(appUser);
  }

}
