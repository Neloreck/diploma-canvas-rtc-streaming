package com.xcore.server.config;

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
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    // todo: Auth there.
    http.authorizeRequests()
        .antMatchers("/api/**").access("hasRole('ROLE_SUPERADMIN')")
        .antMatchers("/**").permitAll();
  }

}
