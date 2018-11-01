package com.xcore.application.authentication.configs

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
class WebSecurityConstants {

  val AUTHORIZATION_HEADER_KEY: String = "Authorization";
  val AUTHORIZATION_HEADER_PREFIX: String = "Bearer";

  @Value("${xcore.security.resource.id}")
  var RESOURCE_ID: String = _;

  @Value("${xcore.security.secret}")
  var SECRET: String = _;

  @Value("${xcore.security.token.validity.expiration}")
  var ACCESS_TOKEN_VALIDITY_SECONDS: Int = 60 * 5 * 1;

  @Value("${xcore.security.token.validity.expiration}")
  var REFRESH_TOKEN_VALIDITY_SECONDS: Int = 60 * 60 * 12;

}
