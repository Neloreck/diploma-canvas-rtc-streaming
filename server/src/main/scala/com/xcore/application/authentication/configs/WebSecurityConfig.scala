package com.xcore.application.authentication.configs;

import com.xcore.application.authentication.exceptions.AuthAccessDeniedHandler;
import com.xcore.application.authentication.services.details.AppUserDetailService;
import com.xcore.server.configs.ApplicationConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/*
 * Docs:
 * https://docs.spring.io/spring-security/site/docs/current/reference/html/jc.html
 */

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  var applicationConfig: ApplicationConfig = _;

  @Autowired
  var authAccessDeniedHandler: AuthAccessDeniedHandler = _;

  @Autowired
  var appUserDetailService: AppUserDetailService = _;

  @Bean
  override def authenticationManager(): AuthenticationManager = {
    super.authenticationManagerBean();
  }

  @Autowired
  @throws[Exception]
  def globalUserDetails(authenticationManagerBuilder: AuthenticationManagerBuilder): Unit = {
    authenticationManagerBuilder
      .userDetailsService(appUserDetailService)
      .passwordEncoder(new BCryptPasswordEncoder());
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
        .exceptionHandling().accessDeniedHandler(new AuthAccessDeniedHandler())
        .authenticationEntryPoint(authAccessDeniedHandler);
  }

}
