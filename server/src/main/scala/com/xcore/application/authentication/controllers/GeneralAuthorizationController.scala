package com.xcore.application.authentication.controllers;

import java.beans.BeanProperty

import com.xcore.application.authentication.models.role.EAppAccessLevel
import com.xcore.application.authentication.models.user.AppUser
import com.xcore.application.authentication.services.AppUserDetailService
import com.xcore.application.authentication.utils.AuthUtils
import com.xcore.server.controllers.rest.exchange.{ApiRequest, ApiResponse, ErrorApiResponse}
import javax.servlet.http.HttpServletResponse
import org.slf4j.{Logger, LoggerFactory}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.{HttpStatus, ResponseEntity}
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation._

@RestController
@RequestMapping(Array("/auth"))
class GeneralAuthorizationController {

  private val log: Logger = LoggerFactory.getLogger("[🔒AUTH]");

  @Autowired
  private var appUserDetailService: AppUserDetailService = _;

  case class SignUpRequest(login: String, mail: String,password: String) extends ApiRequest;
  case class LoginRequest(username: String, password: String) extends ApiRequest;

  case class AuthInfoApiResponse(@BeanProperty authenticated: Boolean, @BeanProperty username: String) extends ApiResponse;
  case class SignUpResponse(@BeanProperty user: AppUser) extends ApiResponse;
  case class LoginResponse(@BeanProperty username: String, @BeanProperty password: String) extends ApiResponse;
  case class TokenRequest(@BeanProperty username: String, @BeanProperty password: String, client_id: String, grant_type: String) extends ApiRequest;

  @GetMapping(Array("/info"))
  def getCurrentAuthInfo: AuthInfoApiResponse = {

    log.info("Get [/info] request.");

    val authentication: Authentication = AuthUtils.getAuthentication;

    AuthInfoApiResponse(
      !authentication.getAuthorities.contains(EAppAccessLevel.ROLE_ANONYMOUS.getAuthority),
      authentication.getPrincipal.asInstanceOf[AppUser].getUsername
    );
  }

  @PostMapping(Array("/login"))
  def login(response: HttpServletResponse): Unit = {

    log.info("Get [/login] request.");

    response.sendRedirect("redirect:/auth/token");
  }

  @PostMapping(Array("/sign-up"))
  def signUp(request: SignUpRequest): ResponseEntity[ApiResponse] = {

    log.info("Get [/sign-up] request.");

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

}