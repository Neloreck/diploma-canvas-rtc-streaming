package com.xcore.server.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/*
 * TODO: Proper security for application.
 *
 * Docs:
 * https://docs.spring.io/spring-security/site/docs/current/reference/html/jc.html
 */

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  ApplicationConfig applicationConfig;

  @Override
  protected void configure(HttpSecurity httpSecurity) throws Exception {

    // Disable for development server.
    if (applicationConfig.getApplicationMode().equals(EApplicationMode.DEVELOPMENT)) {
      httpSecurity.csrf().disable();
    }

    httpSecurity
      .authorizeRequests()
      .antMatchers("/**").permitAll();
  }

}
