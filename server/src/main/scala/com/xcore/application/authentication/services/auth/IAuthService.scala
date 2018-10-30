package com.xcore.application.authentication.services.auth

trait IAuthService {

  def login(): Boolean;

  def logout(): Boolean;

  def isAuthorized(login: String, password: String): Boolean;

}
