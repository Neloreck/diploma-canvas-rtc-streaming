package com.xcore.application.authentication.services

trait IAuthService {

  def login(): Boolean;

  def logout(): Boolean;

  def isAuthorized(login: String, password: String): Boolean;

}
