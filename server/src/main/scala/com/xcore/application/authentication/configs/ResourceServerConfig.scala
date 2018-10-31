package com.xcore.application.authentication.configs;

import com.xcore.application.authentication.exceptions.AuthAccessDeniedHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.{EnableResourceServer, ResourceServerConfigurerAdapter};
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;

@Configuration
@EnableResourceServer
class ResourceServerConfig extends ResourceServerConfigurerAdapter {

  private val RESOURCE_ID: String = "resource_id";

  @Autowired
  private var authAccessDeniedHandler: AuthAccessDeniedHandler = _;

  override def configure(resources: ResourceServerSecurityConfigurer): Unit = {
    resources
      .resourceId(RESOURCE_ID)
      .stateless(false);
  }

  @throws[Exception]
  override def configure(httpSecurity: HttpSecurity): Unit = {

    httpSecurity
      // Api security policy.
      .authorizeRequests()
        .antMatchers("/api/auth/**").anonymous()
        .antMatchers("/api/**").authenticated()
      .and()
      // Fallback for denied access response.
      .exceptionHandling()
        .accessDeniedHandler(authAccessDeniedHandler)
      .authenticationEntryPoint(authAccessDeniedHandler);
  }

}
