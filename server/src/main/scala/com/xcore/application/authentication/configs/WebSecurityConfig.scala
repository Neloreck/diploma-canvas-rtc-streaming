package com.xcore.application.authentication.configs

import com.xcore.application.authentication.services.AppUserDetailService
import org.springframework.context.annotation.{Bean, Configuration}
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder

@Configuration
@EnableWebSecurity(debug = false)
@EnableGlobalMethodSecurity(prePostEnabled = true)
class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  private var appUserDetailsService: AppUserDetailService = _;

  @Bean
  def passwordEncoder(): PasswordEncoder = new BCryptPasswordEncoder;

  /*
   * Configuration:
   */

  override def configure(authenticationManagerBuilder: AuthenticationManagerBuilder): Unit = {
    authenticationManagerBuilder
      .userDetailsService(appUserDetailsService)
      .passwordEncoder(passwordEncoder());
  }

}
