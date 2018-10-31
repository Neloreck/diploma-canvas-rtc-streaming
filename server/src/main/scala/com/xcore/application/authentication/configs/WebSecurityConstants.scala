package com.xcore.application.authentication.configs;

object WebSecurityConstants {

  val JWT_PREFIX: String = "Bearer ";

  val AUTHORIZATION_HEADER = "Authorization";

  val TOKEN_AUTHORITIES_KEY = "authorities";
  val TOKEN_REMEMBER_KEY = "rememberMe";

}
