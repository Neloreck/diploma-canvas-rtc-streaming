package com.xcore.application.authentication.controllers;

import com.xcore.application.authentication.models.user.AppUser
import com.xcore.application.authentication.services.AppUserDetailService
import com.xcore.server.controllers.rest.exchange.{ApiRequest, ApiResponse, ErrorApiResponse}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.{HttpStatus, ResponseEntity}
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation._;

@RestController
@RequestMapping(Array("/api/auth"))
class XCoreAuthController {

  @Autowired
  private var appUserDetailService: AppUserDetailService = _;

  /*
   * Controller endpoints:
   */

  case class AuthInfoApiResponse(authenticated: Boolean) extends ApiResponse;

  @GetMapping(Array("/info"))
  def getCurrentAuthInfo: AuthInfoApiResponse = {

    val authentication = SecurityContextHolder.getContext.getAuthentication;
    val user: UserDetails = appUserDetailService.loadUserByUsername("admin");

    AuthInfoApiResponse(authentication.isAuthenticated);
  }

  case class SignUpRequest(login: String, mail: String, password: String) extends ApiRequest;
  case class SignUpResponse(user: AppUser) extends ApiResponse;

  @PostMapping(Array("/sign-up"))
  def signUp(request: SignUpRequest): ResponseEntity[ApiResponse] = {
    try {
      val user: AppUser = appUserDetailService.registerUser(request.login, request.password, request.mail);
      new ResponseEntity[ApiResponse](SignUpResponse(user), HttpStatus.OK);
    } catch {
      case exception: Exception => new ResponseEntity[ApiResponse](new ErrorApiResponse(exception), HttpStatus.CONFLICT);
    }
  }

  @PostMapping(Array("/logout"))
  def logout(): AuthInfoApiResponse = {
    AuthInfoApiResponse(false);
  }

}