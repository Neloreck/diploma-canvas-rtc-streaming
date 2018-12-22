package com.xcore.application.authentication.controllers;

import java.beans.BeanProperty

import com.xcore.application.authentication.models.role.EAppAccessLevel
import com.xcore.application.authentication.models.user.AppUser
import com.xcore.application.authentication.services.AppUserDetailService
import com.xcore.application.authentication.utils.{AuthDataValidator, AuthUtils}
import com.xcore.server.controllers.rest.exchange.{ApiRequest, ApiResponse, ErrorApiResponse}
import javax.servlet.RequestDispatcher
import javax.servlet.http.HttpServletRequest
import org.slf4j.{Logger, LoggerFactory}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.{HttpStatus, ResponseEntity}
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation._

object GeneralAuthorizationController {

  class RegisterRequest extends ApiRequest {

    @BeanProperty
    var username: String = _;

    @BeanProperty
    var password: String = _;

    @BeanProperty
    var mail: String = _;

  };

  class RegisterSuccessfulResponse(@BeanProperty val username: String, @BeanProperty val id: Long) extends ApiResponse;

}

@RestController
@RequestMapping(Array("/auth"))
class GeneralAuthorizationController {

  private val log: Logger = LoggerFactory.getLogger("[🔒AUTH]");

  @Autowired
  private var appUserDetailService: AppUserDetailService = _;

  // Controller implementation:

  case class AuthInfoApiResponse(@BeanProperty authenticated: Boolean, @BeanProperty username: String) extends ApiResponse;

  @GetMapping(Array("/info"))
  def getCurrentAuthInfo: AuthInfoApiResponse = {

    log.info("Get [/info] request.");

    val authentication: Authentication = AuthUtils.getAuthentication;

    AuthInfoApiResponse(
      !authentication.getAuthorities.contains(EAppAccessLevel.ROLE_ANONYMOUS.getAuthority),
      authentication.getPrincipal.asInstanceOf[AppUser].getUsername
    );
  }

  @PostMapping(
    path = Array("/register"),
    consumes = Array("application/json"),
    produces = Array("application/json")
  )
  def register(@RequestBody request: GeneralAuthorizationController.RegisterRequest): ResponseEntity[ApiResponse] = {

    log.info("Post [/register] request.");

    try {

      /* Check credentials. */
      if (!AuthDataValidator.isValidUsername(request.username) || !AuthDataValidator.isValidEmail(request.mail) || !AuthDataValidator.isValidPassword(request.password) ) {
        return new ResponseEntity[ApiResponse](new ErrorApiResponse("Bad credentials provided."), HttpStatus.BAD_REQUEST);
      }

      /* Check username occupation. */
      if (appUserDetailService.userExists(request.username)) {
        return new ResponseEntity[ApiResponse](new ErrorApiResponse("Provided user already exists."), HttpStatus.BAD_REQUEST);
      }

      /* Check mail occupation. */
      if (appUserDetailService.userWithMailExists(request.mail)) {
        return new ResponseEntity[ApiResponse](new ErrorApiResponse("Provided email already used."), HttpStatus.BAD_REQUEST);
      }

      val user: AppUser = appUserDetailService.registerUser(new AppUser(request.username, request.mail, request.password, EAppAccessLevel.ROLE_USER));
      new ResponseEntity[ApiResponse](new GeneralAuthorizationController.RegisterSuccessfulResponse(user.username, user.id), HttpStatus.OK);

    } catch {
      case exception: Exception =>
        log.error(s"Failed to authorize user, exception: $exception.")
        new ResponseEntity[ApiResponse](new ErrorApiResponse(exception), HttpStatus.CONFLICT);
    }
  }

  @GetMapping(Array("/error"))
  @PostMapping(Array("/error"))
  def handlePostError(request: HttpServletRequest): ErrorApiResponse = {
    new ErrorApiResponse(
      request.getAttribute(if (RequestDispatcher.ERROR_MESSAGE.isEmpty) "Failed to proceed provided request." else RequestDispatcher.ERROR_MESSAGE).asInstanceOf[String]
    )
  }

}
