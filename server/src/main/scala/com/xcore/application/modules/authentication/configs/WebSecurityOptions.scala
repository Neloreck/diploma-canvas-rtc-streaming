package com.xcore.application.modules.authentication.configs

import com.xcore.application.modules.authentication.utils.AuthTokenEnhancer
import javax.sql.DataSource
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.oauth2.provider.token.TokenStore
import org.springframework.security.oauth2.provider.token.store.{InMemoryTokenStore, JdbcTokenStore, JwtAccessTokenConverter}
import org.springframework.stereotype.Component

@Component
class WebSecurityOptions {

  val AUTHORIZATION_HEADER_KEY: String = "Authorization";
  val AUTHORIZATION_HEADER_PREFIX: String = "Bearer";

  // @Value("${xcore.security.frontend.client.id}")
  val CLIENT_APPLICATION_ID: String = "X-CORE-CLIENT";
  val CLIENT_APPLICATION_SECRET: String = "eg2sHsu8qb765x65d";

  // @Value("${xcore.security.frontend.client.id}")
  val SERVER_APPLICATION_ID: String = "X-CORE-SERVER";
  val SIGNING_KEY: String = "SIGNING_KEY";

  // @Value("${xcore.security.token.validity.expiration}")
  val ACCESS_TOKEN_VALIDITY_SECONDS: Int = 60 * 60 * 2;

  // @Value("${xcore.security.token.validity.expiration}")
  val REFRESH_TOKEN_VALIDITY_SECONDS: Int = 60 * 60 * 24 * 10;

  @Autowired
  @ConfigurationProperties(prefix = "spring.datasource")
  private var datasource: DataSource = _;

  @Bean
  def passwordEncoder: PasswordEncoder = new BCryptPasswordEncoder;

  // todo: DB store later.
  @Bean
  def accessTokenStore: TokenStore = new InMemoryTokenStore;

  @Bean
  def accessTokenEnhancer: AuthTokenEnhancer = new AuthTokenEnhancer;

  @Bean
  def accessTokenConverter: JwtAccessTokenConverter = {

    val converter: JwtAccessTokenConverter = new JwtAccessTokenConverter;

    converter.setSigningKey(SIGNING_KEY);
    converter;
  }

}
