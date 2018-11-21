package com.xcore.application.authentication.services

import org.slf4j.{Logger, LoggerFactory}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.{AuthenticationManager, BadCredentialsException, DisabledException, UsernamePasswordAuthenticationToken}
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

class AuthenticationManagerService extends AuthenticationManager {

  val log: Logger = LoggerFactory.getLogger("[AUTH MANAGER]");

  @Autowired
  private var appUserDetailService: AppUserDetailService = _;

  @Autowired
  private var passwordEncoder: PasswordEncoder = _;

  override def authenticate(authentication: Authentication): Authentication = {

    log.info(s"Trying to authenticate $authentication.");

    val username: String = authentication.getPrincipal + "";
    val password: String = authentication.getCredentials + "";

    val user: UserDetails = appUserDetailService.loadUserByUsername(username);

    if (!user.isEnabled) {
      throw new DisabledException("User is currently frozen.");
    }

    if (!passwordEncoder.matches(password, user.getPassword)) {
      throw new BadCredentialsException("Bad credentials provided for user.");
    }

    new UsernamePasswordAuthenticationToken(username, password, user.getAuthorities);
  }

}
