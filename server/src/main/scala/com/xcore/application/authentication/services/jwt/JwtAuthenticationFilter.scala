package com.xcore.application.authentication.services.jwt;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.{HttpServletRequest, HttpServletResponse};
import java.io.IOException;

import com.xcore.application.authentication.utils.AuthUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;


@RequiredArgsConstructor
class JwtAuthenticationFilter extends OncePerRequestFilter {

  @Autowired
  private val tokenProvider: JwtTokenProvider = _;

  /*
   * Authorize, if token found in request.
   */

  @throws[ServletException]
  @throws[IOException]
  protected def doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain): Unit = {

    val jwt: String = AuthUtils.getJwtFromRequest(request);

    if (!StringUtils.isEmpty(jwt) && tokenProvider.validateToken(jwt)) {
      AuthUtils.setAuthentication(tokenProvider.getAuthentication(jwt));
    }

    chain.doFilter(request, response);
  }

}