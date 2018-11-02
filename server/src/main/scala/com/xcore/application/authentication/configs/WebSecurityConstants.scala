package com.xcore.application.authentication.configs

import org.springframework.stereotype.Component

@Component
class WebSecurityConstants {

  val AUTHORIZATION_HEADER_KEY: String = "Authorization";
  val AUTHORIZATION_HEADER_PREFIX: String = "Bearer";

  // @Value("${xcore.security.frontend.client.id}")
  var CLIENT_APPLICATION_ID: String = "X-CORE-CLIENT";

  // @Value("${xcore.security.frontend.client.id}")
  var SERVER_APPLICATION_ID: String = "X-CORE-SERVER";

  // @Value("${xcore.security.secret}")
  var SECRET: String = "eg2sHsu8qb765x65d=HDSBddfn/sfns";

  // @Value("${xcore.security.token.validity.expiration}")
  var ACCESS_TOKEN_VALIDITY_SECONDS: Int = 60 * 5 * 1;

  // @Value("${xcore.security.token.validity.expiration}")
  var REFRESH_TOKEN_VALIDITY_SECONDS: Int = 60 * 60 * 12;

}
