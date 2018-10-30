package com.xcore.application.authentication.controllers.auth_exchange;

import com.xcore.server.controllers.rest.general.api.Response;
import org.springframework.security.core.Authentication;

class AuthInfoResponse(authentication: Authentication) extends Response {

  private var authenticated: Boolean = false;

  def CurrentAuthInfoResponse(authentication: Authentication) {
    this.authenticated = authentication.isAuthenticated;
  }

  def isAuthenticated: Boolean = this.authenticated;

}

