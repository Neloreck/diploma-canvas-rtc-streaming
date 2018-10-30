package com.xcore.server.configs;

import com.xcore.application.authentication.exceptions.AuthAccessDeniedHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
/*
 * Docs:
 * https://docs.spring.io/spring-security/site/docs/current/reference/html/jc.html
 */

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  ApplicationConfig applicationConfig;

  @Autowired
  AuthAccessDeniedHandler authAccessDeniedHandler;

  @Override
  protected void configure(HttpSecurity httpSecurity) throws Exception {

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
        .exceptionHandling().accessDeniedHandler(new AuthAccessDeniedHandler())
        .authenticationEntryPoint(authAccessDeniedHandler);
  }

}
