package com.xcore.application.authentication.services

import org.slf4j.{Logger, LoggerFactory}
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Service

@Service
class AuthManagerService extends AuthenticationManager {

  val log: Logger = LoggerFactory.getLogger("[AUTH MANAGER]");

  override def authenticate(authentication: Authentication): Authentication = {

    log.info(s"Trying to authenticate $authentication.");

    authentication;
  }

}
