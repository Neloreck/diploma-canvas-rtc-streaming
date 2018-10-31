package com.xcore.application.authentication.utils;

import com.xcore.application.authentication.configs.WebSecurityConstants;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import javax.servlet.http.HttpServletRequest;

object AuthUtils {

  def isUserInRole(authentication: Authentication, authority: String): Boolean = {
    authentication != null && authentication.getAuthorities.stream.anyMatch(grantedAuthority => grantedAuthority.getAuthority.equals(authority));
  }

  def getJwtFromRequest(request: HttpServletRequest): String = {

    val bearerToken = request.getHeader(WebSecurityConstants.AUTHORIZATION_HEADER)

    if (bearerToken.startsWith(WebSecurityConstants.JWT_PREFIX)) {
      bearerToken.replace(WebSecurityConstants.JWT_PREFIX, "");
    } else {
      null;
    }
  }

  def getAuthentication: Authentication = SecurityContextHolder.getContext.getAuthentication;

  def setAuthentication(authentication: Authentication): Unit = SecurityContextHolder.getContext.setAuthentication(authentication);

  def getCurrentUserEmail: String = getAuthentication.getName;

}
