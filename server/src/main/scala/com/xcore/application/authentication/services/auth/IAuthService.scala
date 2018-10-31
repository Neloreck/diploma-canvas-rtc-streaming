package com.xcore.application.authentication.services.auth;

trait IAuthService {

  def login(): Boolean;

  def logout(): Boolean;

}
