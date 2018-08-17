package com.xcore.server.controller.auth;

import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/auth", method = {RequestMethod.DELETE, RequestMethod.POST, RequestMethod.PUT})
public class AuthController {

  private AuthenticationSuccessHandler handler = new SavedRequestAwareAuthenticationSuccessHandler();

  @PostMapping
  public void authenticate(@RequestParam Map<String, String> map,
                           HttpServletRequest request, HttpServletResponse response) throws Exception {

    // handler.onAuthenticationSuccess(request, response, result);
  }

}
