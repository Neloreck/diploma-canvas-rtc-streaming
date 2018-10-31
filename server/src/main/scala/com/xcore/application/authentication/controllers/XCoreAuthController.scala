package com.xcore.application.authentication.controllers;

import com.xcore.application.authentication.controllers.xcore_auth_exchange._;
import com.xcore.application.authentication.services.auth.IAuthService
import com.xcore.application.authentication.services.details.AppUserDetailService;
import com.xcore.server.controllers.rest.exchange.ErrorApiResponse;
import org.springframework.beans.factory.annotation.{Autowired, Qualifier};
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation._;

@RestController
@RequestMapping(Array("/api/auth"))
class XCoreAuthController {

  @Autowired
  private var appUserDetailService: AppUserDetailService = _;

  @Autowired
  @Qualifier("XCoreAuthService")
  private var XCoreAuthService: IAuthService = _;

  // Controller methods:

  @GetMapping(Array("/info"))
  def getCurrentAuthInfo(): AuthInfoApiResponse = {

    val authentication = SecurityContextHolder.getContext.getAuthentication;

    new AuthInfoApiResponse(authentication);
  }

  @PostMapping(Array("/sign-up"))
  def signUp(request: SignUpRequest): SignUpResponse = {
    new SignUpResponse();
  }

  @PostMapping(Array("/login"))
  def login(request: LoginApiRequest): LoginApiResponse = {
    new LoginApiResponse();
  }

  @PostMapping(Array("/logout"))
  def logout(): AuthInfoApiResponse = {
    val authentication = SecurityContextHolder.getContext.getAuthentication;
    authentication.setAuthenticated(false);

    new AuthInfoApiResponse(authentication);
  }

  @PostMapping(Array("/refresh-token"))
  def refreshTokens(): RefreshTokensResponse = {
    new RefreshTokensResponse();
  }

  @GetMapping(Array("/token"))
  def getTokens(): TokensResponse = {
    new TokensResponse();
  }

}