package com.xcore.application.authentication.controllers;

import com.xcore.application.authentication.controllers.auth_exchange._
import com.xcore.application.authentication.models.user.IAppUserRepository
import com.xcore.application.authentication.services.IAuthService
import org.springframework.beans.factory.annotation.{Autowired, Qualifier}
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.{GetMapping, PostMapping, RequestMapping, RestController};

@RestController
@RequestMapping(Array("/api/auth"))
class XCoreAuthController {

  @Autowired
  private var appUserRepository: IAppUserRepository = _;

  @Autowired
  @Qualifier("XCoreAuthService")
  private var XCoreAuthService: IAuthService = _;

  // Controller methods:

  @GetMapping(Array("/info"))
  def getCurrentAuthInfo(): AuthInfoResponse = {

    val authentication = SecurityContextHolder.getContext.getAuthentication;

    new AuthInfoResponse(authentication);
  }

  @PostMapping(Array("/sign-up"))
  def signUp(request: SignUpRequest): SignUpResponse = {
    new SignUpResponse();
  }

  @PostMapping(Array("/login"))
  def login(request: LoginRequest): LoginResponse = {
    new LoginResponse();
  }

  @PostMapping(Array("/logout"))
  def logout(): AuthInfoResponse = {
    val authentication = SecurityContextHolder.getContext.getAuthentication;
    authentication.setAuthenticated(false);

    new AuthInfoResponse(authentication);
  }

  @PostMapping(Array("/refresh-tokens"))
  def refreshTokens(): RefreshTokensResponse = {
    new RefreshTokensResponse();
  }

  @GetMapping(Array("/tokens"))
  def getTokens(): TokensResponse = {
    new TokensResponse();
  }

}