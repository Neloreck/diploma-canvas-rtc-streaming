package com.xcore.application.authentication.configs

import com.xcore.application.authentication.utils.AuthTokenEnhancer
import javax.sql.DataSource
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.{Bean, Primary}
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.oauth2.provider.token.DefaultTokenServices
import org.springframework.security.oauth2.provider.token.store.{InMemoryTokenStore, JwtAccessTokenConverter}
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
  val ACCESS_TOKEN_VALIDITY_SECONDS: Int = 60 * 5 * 1;

  // @Value("${xcore.security.token.validity.expiration}")
  val REFRESH_TOKEN_VALIDITY_SECONDS: Int = 60 * 60 * 12;

  @Autowired
  private var datasource: DataSource = _;

  @Bean
  def getPasswordEncoder: PasswordEncoder = new BCryptPasswordEncoder;

  @Bean
  def getAccessTokenStore: InMemoryTokenStore = new InMemoryTokenStore();

  @Bean
  def getAccessTokenEnhancer: AuthTokenEnhancer = new AuthTokenEnhancer;

  @Bean
  def getAccessTokenConverter: JwtAccessTokenConverter = {

    val converter: JwtAccessTokenConverter = new JwtAccessTokenConverter;

    converter.setSigningKey(SIGNING_KEY);
    converter;
  }

  @Bean
  @Primary
  def getAccessTokenServices: DefaultTokenServices = {

    val defaultTokenServices: DefaultTokenServices = new DefaultTokenServices();

    defaultTokenServices.setTokenStore(getAccessTokenStore);
    defaultTokenServices.setSupportRefreshToken(true);

    defaultTokenServices;
  }

}
