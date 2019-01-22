package com.xcore.application.modules.authentication.configs

import java.util

import com.xcore.application.modules.authentication.models.role.{EApplicationAccessLevel, EApplicationAccessScope, EApplicationGrantType}
import com.xcore.application.modules.authentication.utils.AuthenticationTokenEnhancer
import org.slf4j.{Logger, LoggerFactory}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.oauth2.config.annotation.web.configuration.{AuthorizationServerConfigurerAdapter, EnableAuthorizationServer}
import org.springframework.security.oauth2.provider.token.{TokenEnhancerChain, TokenStore}
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter

@Configuration
@EnableAuthorizationServer
class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

  private val log: Logger = LoggerFactory.getLogger("[🔒SECURITY]");

  @Autowired
  private var webSecurityOptions: WebSecurityOptions = _;

  @Autowired
  private var authenticationManager: AuthenticationManager = _;

  @Autowired
  private var accessTokenStore: TokenStore = _;

  @Autowired
  private var passwordEncoder: PasswordEncoder = _;

  @Autowired
  private var accessTokenConverter: JwtAccessTokenConverter = _;

  @Autowired
  private var accessTokenEnhancer: AuthenticationTokenEnhancer = _;

  /*
   * Configuration:
   */

  @throws[Exception]
  override def configure(authorizationServerSecurityConfigurer: AuthorizationServerSecurityConfigurer): Unit = {

    log.info("Configuring auth server security.");

    authorizationServerSecurityConfigurer
      .tokenKeyAccess("permitAll()")
      .checkTokenAccess("hasAuthority('ROLE_USER')");
  }

  @throws[Exception]
  override def configure(clientDetailsServiceConfigurer: ClientDetailsServiceConfigurer): Unit = {

    log.info("Configuring auth server client details.");

    /*
     * Configuration for front-end application.
     * Anything else based on oauth2 is not allowed.
     * Should implement db store for clients next.
     */

    clientDetailsServiceConfigurer
      .inMemory()
        .withClient(webSecurityOptions.CLIENT_APPLICATION_ID)
          .secret(passwordEncoder.encode(webSecurityOptions.CLIENT_APPLICATION_SECRET))
          .resourceIds(webSecurityOptions.SERVER_APPLICATION_ID)

          .authorizedGrantTypes(EApplicationGrantType.PASSWORD.getType, EApplicationGrantType.IMPLICIT.getType, EApplicationGrantType.REFRESH_TOKEN.getType)
          .authorities(EApplicationAccessLevel.ROLE_APPLICATION.getRole)
          .scopes(EApplicationAccessScope.READ.getScope, EApplicationAccessScope.WRITE.getScope)

          .accessTokenValiditySeconds(webSecurityOptions.ACCESS_TOKEN_VALIDITY_SECONDS)
          .refreshTokenValiditySeconds(webSecurityOptions.REFRESH_TOKEN_VALIDITY_SECONDS);
  }

  @throws[Exception]
  override def configure(authorizationServerEndpointsConfigurer: AuthorizationServerEndpointsConfigurer): Unit = {

    log.info("Configuring auth server endpoints.");

    val tokenEnhancerChain: TokenEnhancerChain = new TokenEnhancerChain();
    tokenEnhancerChain.setTokenEnhancers(util.Arrays.asList(accessTokenEnhancer, accessTokenConverter))

    authorizationServerEndpointsConfigurer
      .tokenStore(accessTokenStore)
      .tokenEnhancer(tokenEnhancerChain)
      .authenticationManager(this.authenticationManager);

    authorizationServerEndpointsConfigurer
      .pathMapping("/oauth/confirm_access", "/auth/confirm_access")
      .pathMapping("/oauth/authorize", "/auth/authorize")
      .pathMapping("/oauth/check_token", "/auth/check_token")
      .pathMapping("/oauth/token_key", "/auth/token_key")
      .pathMapping("/oauth/error", "/auth/error")
      .pathMapping("/oauth/login", "/auth/login")
      .pathMapping("/oauth/token", "/auth/token");
  }

}
