package com.xcore.application.authentication.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.token.store.{JwtAccessTokenConverter, JwtTokenStore};

/*
 * Docs, examples:
 * https://www.devglan.com/spring-security/spring-boot-oauth2-jwt-example
 */

class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

  val CLIENT_ID: String = "devglan-client";
  val CLIENT_SECRET: String = "devglan-secret";
  val GRANT_TYPE_PASSWORD: String= "password";
  val AUTHORIZATION_CODE: String = "authorization_code";
  val REFRESH_TOKEN: String = "refresh_token";
  val IMPLICIT: String = "implicit";
  val SCOPE_READ: String = "read";
  val SCOPE_WRITE: String = "write";
  val TRUST: String = "trust";

  val ACCESS_TOKEN_VALIDITY_SECONDS: Int = 1 * 60 * 60;
  val REFRESH_TOKEN_VALIDITY_SECONDS: Int = 6 * 60 * 60;

  @Autowired
  private var authenticationManager: AuthenticationManager = _;

  @Bean
  private def accessTokenConverter(): JwtAccessTokenConverter = {

    val converter: JwtAccessTokenConverter = new JwtAccessTokenConverter();

    converter.setSigningKey("as466gf");
    converter;
  }

  @Bean
  private def tokenStore(): JwtTokenStore = {
    new JwtTokenStore(accessTokenConverter());
  }

  @throws[Exception]
  override def configure(configurer: ClientDetailsServiceConfigurer): Unit = {
    configurer
      .inMemory()
      .withClient(CLIENT_ID)
      .secret(CLIENT_SECRET)
      .authorizedGrantTypes(GRANT_TYPE_PASSWORD, AUTHORIZATION_CODE, REFRESH_TOKEN, IMPLICIT)
      .scopes(SCOPE_READ, SCOPE_WRITE, TRUST)
      .accessTokenValiditySeconds(ACCESS_TOKEN_VALIDITY_SECONDS)
      .refreshTokenValiditySeconds(REFRESH_TOKEN_VALIDITY_SECONDS);
  }

  @throws[Exception]
  override def configure(endpoints: AuthorizationServerEndpointsConfigurer): Unit = {
    endpoints
      .tokenStore(tokenStore())
      .authenticationManager(authenticationManager)
      .accessTokenConverter(accessTokenConverter());
  }

}
