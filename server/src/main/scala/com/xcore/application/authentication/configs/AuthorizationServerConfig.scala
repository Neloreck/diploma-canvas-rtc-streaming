package com.xcore.application.authentication.configs;

import com.xcore.server.configs.ApplicationConfig;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.{Bean, Primary};
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.store.{JwtAccessTokenConverter, JwtTokenStore};
import org.springframework.security.oauth2.provider.client.JdbcClientDetailsService;
import org.springframework.security.oauth2.provider.approval.JdbcApprovalStore;
import org.springframework.security.oauth2.provider.code.JdbcAuthorizationCodeServices;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;

/*
 * Docs, examples:
 * https://www.devglan.com/spring-security/spring-boot-oauth2-jwt-example
 * https://www.baeldung.com/spring-security-oauth-jwt
 */

class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

  @Autowired
  @ConfigurationProperties(prefix = "auth")
  private var oauthDataSource: DataSource = _;

  @Autowired
  private var applicationConfig: ApplicationConfig = _;

  @Autowired
  private var authenticationManager: AuthenticationManager = _;

  /*
   * Beans:
   */

  @Bean
  def getClientDetailsService: JdbcClientDetailsService = new JdbcClientDetailsService(oauthDataSource);

  @Bean
  def getTokenStore: JwtTokenStore = new JwtTokenStore(getAccessTokenConverter);

  @Bean
  def getApprovalStore: JdbcApprovalStore = new JdbcApprovalStore(oauthDataSource);

  @Bean
  def getAuthorizationCodeServices: JdbcAuthorizationCodeServices = new JdbcAuthorizationCodeServices(oauthDataSource);

  @Bean
  def getAccessTokenConverter: JwtAccessTokenConverter = {

    val converter: JwtAccessTokenConverter = new JwtAccessTokenConverter();

    converter.setSigningKey(applicationConfig.getAuthSigningKey);
    converter;
  }

  @Bean
  @Primary
  def getTokenServices: DefaultTokenServices = {

    val defaultTokenServices: DefaultTokenServices = new DefaultTokenServices();

    defaultTokenServices.setTokenStore(getTokenStore);
    defaultTokenServices.setSupportRefreshToken(true);

    defaultTokenServices;
  }

  /*
   * Configuration:
   */

  @throws[Exception]
  override def configure(clientDetailsServiceConfigurer: ClientDetailsServiceConfigurer): Unit = {
    clientDetailsServiceConfigurer
      .withClientDetails(getClientDetailsService);
  }

  @throws[Exception]
  override def configure(authorizationServerSecurityConfigurer: AuthorizationServerSecurityConfigurer): Unit = {
    // todo.
  }

  @throws[Exception]
  override def configure(authorizationServerEndPointsConfigurer: AuthorizationServerEndpointsConfigurer): Unit = {

    authorizationServerEndPointsConfigurer
      .pathMapping("/oauth/authorize", "/api/auth/login")
      .pathMapping("/oauth/token", "/api/auth/token")

    authorizationServerEndPointsConfigurer
      .authenticationManager(authenticationManager)
      .authorizationCodeServices(getAuthorizationCodeServices)
      .approvalStore(getApprovalStore)
      .accessTokenConverter(getAccessTokenConverter)
      .tokenStore(getTokenStore);
  }

}
