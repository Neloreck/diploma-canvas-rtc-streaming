package com.xcore.application.authentication.controllers;

import com.xcore.application.authentication.controllers.api.{CurrentAuthInfoResponse, SignUpRequest, SignUpResponse};
import com.xcore.application.authentication.models.user.IAppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.{GetMapping, PostMapping, RequestMapping, RestController};

@RestController
@RequestMapping(Array ("/api/auth") )
class AuthController {

  @Autowired
  private var appUserRepository: IAppUserRepository = _;

  @GetMapping(Array("/info"))
  def getCurrentAuthInfo: CurrentAuthInfoResponse = {
    val authentication = SecurityContextHolder.getContext.getAuthentication;

    new CurrentAuthInfoResponse(authentication);
  }

  @PostMapping(Array("/logout"))
  def logout: CurrentAuthInfoResponse = {
    val authentication = SecurityContextHolder.getContext.getAuthentication;
    authentication.setAuthenticated(false);

    new CurrentAuthInfoResponse(authentication);
  }

  @PostMapping(Array("/sign-up"))
  def signUp(request: SignUpRequest): SignUpResponse = {


    new SignUpResponse();
  }

}