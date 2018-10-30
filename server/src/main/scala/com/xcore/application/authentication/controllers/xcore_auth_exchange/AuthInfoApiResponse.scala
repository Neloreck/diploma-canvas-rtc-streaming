package com.xcore.application.authentication.controllers.xcore_auth_exchange;

import com.xcore.server.controllers.rest.exchange.ApiResponse
import org.springframework.security.core.Authentication;

class AuthInfoApiResponse(authentication: Authentication) extends ApiResponse {

  private var authenticated: Boolean = false;

  def CurrentAuthInfoResponse(authentication: Authentication) {
    this.authenticated = authentication.isAuthenticated;
  }

  def isAuthenticated: Boolean = this.authenticated;

}

