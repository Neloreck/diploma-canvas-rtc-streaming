package com.xcore.application.authentication.configs;

import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.oauth2.config.annotation.web.configuration.{EnableResourceServer, ResourceServerConfigurerAdapter}
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler

@Configuration
@EnableResourceServer
class ResourceServerConfig extends ResourceServerConfigurerAdapter {

  private val RESOURCE_ID: String = "resource_id";

  override def configure(resources: ResourceServerSecurityConfigurer): Unit = {
    resources
      .resourceId(RESOURCE_ID)
      .stateless(false)
  }

  @throws[Exception]
  override def configure(httpSecurity: HttpSecurity): Unit = {
    httpSecurity
      .anonymous().disable()
      .authorizeRequests()
        .antMatchers("/api/media/**").access("hasRole('ADMIN')")
    .and()
      .exceptionHandling().accessDeniedHandler(new OAuth2AccessDeniedHandler());
  }

}
