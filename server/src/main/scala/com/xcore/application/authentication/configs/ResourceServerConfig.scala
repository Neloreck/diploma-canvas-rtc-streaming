package com.xcore.application.authentication.configs;

import com.xcore.application.authentication.exceptions.AuthAccessDeniedHandler;
import com.xcore.server.configs.ApplicationConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.{Bean, Configuration, Primary};
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.{EnableResourceServer, ResourceServerConfigurerAdapter};
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.store.{JwtAccessTokenConverter, JwtTokenStore};

@Configuration
@EnableResourceServer
class ResourceServerConfig extends ResourceServerConfigurerAdapter {

  @Autowired
  private var applicationConfig: ApplicationConfig = _;

  @Autowired
  private var authAccessDeniedHandler: AuthAccessDeniedHandler = _;

  /*
   * Beans:
   */

  @Bean
  def getTokenStore = new JwtTokenStore(getAccessTokenConverter);

  @Bean
  def getAccessTokenConverter: JwtAccessTokenConverter = {

    val converter = new JwtAccessTokenConverter

    converter.setSigningKey(applicationConfig.getAuthSigningKey)
    converter
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

  override def configure(resourceServerSecurityConfigurer: ResourceServerSecurityConfigurer): Unit = {
    resourceServerSecurityConfigurer
      .tokenServices(getTokenServices)
  }

  @Override
  @throws[Exception]
  protected override def configure(httpSecurity: HttpSecurity): Unit = {

    // Disable csrf because we will use token for our api requests.
    httpSecurity
      .csrf().disable();

    httpSecurity
      // Api security policy.
      .authorizeRequests()
      .antMatchers("/api/auth/**").anonymous()
      .antMatchers("/api/**").authenticated()
      .and()
      // Fallback for denied access response.
      .exceptionHandling().accessDeniedHandler(authAccessDeniedHandler)
      .authenticationEntryPoint(authAccessDeniedHandler);
  }


}
