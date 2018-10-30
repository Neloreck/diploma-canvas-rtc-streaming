package com.xcore.application.authentication.exceptions;

import javax.servlet.ServletException;
import javax.servlet.http.{HttpServletRequest, HttpServletResponse};
import java.io.IOException;

import com.xcore.server.controllers.rest.exchange.ErrorApiResponse;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.stereotype.Component;

@Component
class AuthAccessDeniedHandler extends AccessDeniedHandler with AuthenticationEntryPoint {

  @throws[IOException]
  @throws[ServletException]
  override def commence(request: HttpServletRequest, response: HttpServletResponse, exception: AuthenticationException): Unit = {

    val mapper = new ObjectMapper();
    val responseMsg = mapper.writeValueAsString(new ErrorApiResponse("Full authentication is required to access this resource"));

    response.setStatus(403);
    response.getWriter.write(responseMsg);
  }

  @throws[IOException]
  @throws[ServletException]
  override def handle(request: HttpServletRequest, response: HttpServletResponse, exception: AccessDeniedException): Unit = {

    val mapper = new ObjectMapper();
    val responseMsg = mapper.writeValueAsString(new ErrorApiResponse(exception));

    response.getWriter.write(responseMsg);
  }

}
