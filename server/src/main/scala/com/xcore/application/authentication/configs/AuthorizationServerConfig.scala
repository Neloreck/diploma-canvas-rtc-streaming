package com.xcore.application.authentication.configs

import com.xcore.application.authentication.models.role.EAppUserRoleAccessLevel
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.{Bean, Configuration}
import org.springframework.context.annotation.Primary
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.oauth2.config.annotation.web.configuration.{AuthorizationServerConfigurerAdapter, EnableAuthorizationServer}
import org.springframework.security.oauth2.provider.token.store.{JwtAccessTokenConverter, JwtTokenStore}
import org.springframework.security.oauth2.provider.token.DefaultTokenServices
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer

@Configuration
@EnableAuthorizationServer
class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

  @Autowired
  private var authenticationManager: AuthenticationManager = _;

  @Autowired
  private var webSecurityConstants: WebSecurityConstants = _;

  @Bean
  def getTokenStore = new JwtTokenStore(getAccessTokenConverter);

  @Bean
  def getAccessTokenConverter: JwtAccessTokenConverter = {

    val converter: JwtAccessTokenConverter = new JwtAccessTokenConverter();

    converter.setSigningKey("SESESWAGEGAEGdbdsb4yt24-sagasg");
    converter;
  }

  @Bean
  @Primary
  def getTokenServices: DefaultTokenServices = {

    val defaultTokenServices: DefaultTokenServices = new DefaultTokenServices();

    defaultTokenServices.setTokenStore(getTokenStore);
    defaultTokenServices.setSupportRefreshToken(true);
    defaultTokenServices.setTokenEnhancer(getAccessTokenConverter);

    defaultTokenServices;
  }

  /*
   * Configuration:
   */

  @throws[Exception]
  override def configure(authorizationServerEndpointsConfigurer: AuthorizationServerEndpointsConfigurer): Unit = {

    authorizationServerEndpointsConfigurer
      .pathMapping("/oauth/authorize", "/api/auth/authorize")
      .pathMapping("/oauth/token", "/api/auth/token");

    authorizationServerEndpointsConfigurer
      .authenticationManager(this.authenticationManager)
      .tokenServices(getTokenServices)
      .tokenStore(getTokenStore)
      .accessTokenConverter(getAccessTokenConverter);
  }

  @throws[Exception]
  override def configure(authorizationServerSecurityConfigurer: AuthorizationServerSecurityConfigurer): Unit = {
    authorizationServerSecurityConfigurer
      .checkTokenAccess("isAuthenticated()");
  }

  @throws[Exception]
  override def configure(clientDetailsServiceConfigurer: ClientDetailsServiceConfigurer): Unit = {
    clientDetailsServiceConfigurer
      .inMemory
        .withClient(webSecurityConstants.RESOURCE_ID)
        .authorizedGrantTypes("client_credentials", "password")
        .authorities(EAppUserRoleAccessLevel.ROLE_USER.name())
        .scopes("read", "write", "trust")
        .resourceIds("oauth2-resource")
        .accessTokenValiditySeconds(webSecurityConstants.ACCESS_TOKEN_VALIDITY_SECONDS)
        .refreshTokenValiditySeconds(webSecurityConstants.REFRESH_TOKEN_VALIDITY_SECONDS)
        .secret(webSecurityConstants.SECRET);
  }

}
