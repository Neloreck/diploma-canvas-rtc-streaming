package com.xcore.application.authentication.configs;

import com.xcore.application.authentication.exceptions.AuthAccessDeniedHandler;
import com.xcore.application.authentication.services.details.AppUserDetailService;
import com.xcore.server.configs.ApplicationConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.annotation.Resource;
/*
 * Docs:
 * https://docs.spring.io/spring-security/site/docs/current/reference/html/jc.html
 */

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  ApplicationConfig applicationConfig;

  @Autowired
  AuthAccessDeniedHandler authAccessDeniedHandler;

  @Autowired
  AppUserDetailService appUserDetailService;

  @Bean
  @Override
  public AuthenticationManager authenticationManager() throws Exception {
    return super.authenticationManagerBean();
  }

  @Autowired
  public void globalUserDetails(AuthenticationManagerBuilder auth) throws Exception {
    auth
      .userDetailsService(appUserDetailService)
      .passwordEncoder(new BCryptPasswordEncoder());
  }

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
