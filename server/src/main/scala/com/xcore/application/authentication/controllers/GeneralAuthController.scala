package com.xcore.application.authentication.controllers;

import java.beans.BeanProperty

import com.xcore.application.authentication.models.user.AppUser
import com.xcore.application.authentication.services.AppUserDetailService
import com.xcore.server.controllers.rest.exchange.{ApiRequest, ApiResponse, ErrorApiResponse}
import org.slf4j.{Logger, LoggerFactory}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.{HttpStatus, ResponseEntity}
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation._

@RestController
@RequestMapping(Array("/api/auth"))
class GeneralAuthController {

  @Autowired
  private var appUserDetailService: AppUserDetailService = _;

  private val log: Logger = LoggerFactory.getLogger("[🔒AUTH]");

  case class AuthInfoApiResponse(@BeanProperty authenticated: Boolean) extends ApiResponse;
  case class SignUpRequest(@BeanProperty login: String, @BeanProperty mail: String, @BeanProperty password: String) extends ApiRequest;
  case class SignUpResponse(@BeanProperty user: AppUser) extends ApiResponse;

  @GetMapping(Array("/info"))
  def getCurrentAuthInfo: AuthInfoApiResponse = {

    log.info("Got info request.");

    val authentication = SecurityContextHolder.getContext.getAuthentication;
    val user: UserDetails = appUserDetailService.loadUserByUsername("admin");

    val response = AuthInfoApiResponse(authentication.isAuthenticated);

    response;
  }

  @PostMapping(Array("/sign-up"))
  def signUp(request: SignUpRequest): ResponseEntity[ApiResponse] = {
    try {
      val user: AppUser = appUserDetailService.registerUser(request.login, request.password, request.mail);

      log.info(s"Successfully signed up user $user.");

      new ResponseEntity[ApiResponse](SignUpResponse(user), HttpStatus.OK);
    } catch {
      case exception: Exception =>
        log.error(s"Failed to authorize user, exception: $exception.")
        new ResponseEntity[ApiResponse](new ErrorApiResponse(exception), HttpStatus.CONFLICT);
    }
  }

  @PostMapping(Array("/logout"))
  def logout(): AuthInfoApiResponse = {
    log.info("Got logout request.");
    AuthInfoApiResponse(false);
  }

}