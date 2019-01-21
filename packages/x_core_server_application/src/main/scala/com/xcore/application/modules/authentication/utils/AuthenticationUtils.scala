package com.xcore.application.modules.authentication.utils

import com.xcore.application.modules.authentication.models.user.ApplicationUser
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder

object AuthenticationUtils {

  def isUserInRole(authentication: Authentication, authority: String): Boolean = {
    authentication != null && authentication.getAuthorities.stream.anyMatch(grantedAuthority => grantedAuthority.getAuthority.equals(authority));
  }

  def getAuthentication: Authentication = SecurityContextHolder.getContext.getAuthentication;

  def getAuthorizedUserId: Long = SecurityContextHolder.getContext.getAuthentication.getPrincipal.asInstanceOf[ApplicationUser].getId;

  def getAuthorizedUser: ApplicationUser = SecurityContextHolder.getContext.getAuthentication.getPrincipal.asInstanceOf[ApplicationUser];

  def setAuthentication(authentication: Authentication): Unit = SecurityContextHolder.getContext.setAuthentication(authentication);

  def getCurrentUserLogin: String = getAuthentication.getName;

}
