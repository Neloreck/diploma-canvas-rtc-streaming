package com.xcore.application.authentication.controllers;

import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.http.HttpStatus;
import javax.servlet.http.{HttpServletRequest, HttpServletResponse};
import java.io.IOException;

import com.xcore.server.controllers.rest.exchange.ErrorApiResponse;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.security.core.AuthenticationException;

class XCoreAuthenticationEntryPoint extends AuthenticationEntryPoint {

  @throws[IOException]
  def commence(request: HttpServletRequest, response: HttpServletResponse, authenticationException: AuthenticationException): Unit = {
    response.setStatus(HttpStatus.UNAUTHORIZED.value());
    response.getWriter.write(new ObjectMapper().writeValueAsString(new ErrorApiResponse(HttpStatus.UNAUTHORIZED.getReasonPhrase)));
  }

}
