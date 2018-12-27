package com.xcore.application.modules.authentication.utils

import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder

object AuthUtils {

  def isUserInRole(authentication: Authentication, authority: String): Boolean = {
    authentication != null && authentication.getAuthorities.stream.anyMatch(grantedAuthority => grantedAuthority.getAuthority.equals(authority));
  }

  def getAuthentication: Authentication = SecurityContextHolder.getContext.getAuthentication;

  def setAuthentication(authentication: Authentication): Unit = SecurityContextHolder.getContext.setAuthentication(authentication);

  def getCurrentUserLogin: String = getAuthentication.getName;

}
