package com.xcore.application.authentication.configs

import com.xcore.application.authentication.models.role.EAppUserRoleAccessLevel
import javax.sql.DataSource
import org.slf4j.{Logger, LoggerFactory}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.{Bean, Configuration}
import org.springframework.context.annotation.Primary
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.oauth2.config.annotation.web.configuration.{AuthorizationServerConfigurerAdapter, EnableAuthorizationServer}
import org.springframework.security.oauth2.provider.token.store.{JdbcTokenStore, JwtAccessTokenConverter}
import org.springframework.security.oauth2.provider.token.DefaultTokenServices
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer

@Configuration
@EnableAuthorizationServer
class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

  private val log: Logger = LoggerFactory.getLogger("[🔒SECURITY]");

  @Autowired
  private var authenticationManager: AuthenticationManager = _;

  @Autowired
  private var webSecurityConstants: WebSecurityConstants = _;

  @Autowired
  private var datasource: DataSource = _;

  @Bean
  def getTokenStore = new JdbcTokenStore(datasource);

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

    log.info("Configuring auth server endpoints.");

    authorizationServerEndpointsConfigurer
      .pathMapping("/oauth/confirm_access", "/api/auth/confirm_access")
      .pathMapping("/oauth/authorize", "/api/auth/authorize")
      .pathMapping("/oauth/check_token", "/api/auth/check_token")
      .pathMapping("/oauth/token_key", "/api/auth/token_key")
      .pathMapping("/oauth/error", "/api/auth/error")
      .pathMapping("/oauth/token", "/api/auth/token");

    authorizationServerEndpointsConfigurer
      .authenticationManager(this.authenticationManager)
      .tokenServices(getTokenServices)
      .tokenStore(getTokenStore)
      .accessTokenConverter(getAccessTokenConverter);
  }

  @throws[Exception]
  override def configure(authorizationServerSecurityConfigurer: AuthorizationServerSecurityConfigurer): Unit = {

    log.info("Configuring auth server security.");

    authorizationServerSecurityConfigurer
      .tokenKeyAccess("permitAll()")
      .checkTokenAccess("isAuthenticated()");
  }

  @throws[Exception]
  override def configure(clientDetailsServiceConfigurer: ClientDetailsServiceConfigurer): Unit = {

    log.info("Configuring auth server client details.");

    clientDetailsServiceConfigurer
      .jdbc(datasource)
        .withClient(webSecurityConstants.CLIENT_APPLICATION_ID)
        .authorizedGrantTypes("implicit", "password")
        .authorities(EAppUserRoleAccessLevel.ROLE_USER.name())
        .scopes("read", "write")
        .resourceIds(webSecurityConstants.SERVER_APPLICATION_ID)
        .accessTokenValiditySeconds(webSecurityConstants.ACCESS_TOKEN_VALIDITY_SECONDS)
        .refreshTokenValiditySeconds(webSecurityConstants.REFRESH_TOKEN_VALIDITY_SECONDS)
        .secret(webSecurityConstants.SECRET);
  }

}
