package com.xcore.application.modules.authentication.configs

import com.xcore.application.modules.authentication.services.ApplicationUserDetailService
import org.slf4j.{Logger, LoggerFactory}
import org.springframework.context.annotation.{Bean, Configuration}
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.crypto.password.PasswordEncoder

@Configuration
@EnableWebSecurity(debug = false)
@EnableGlobalMethodSecurity(prePostEnabled = true)
class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  private val log: Logger = LoggerFactory.getLogger("[🔒SECURITY]");

  @Autowired
  private var appUserDetailsService: ApplicationUserDetailService = _;

  @Autowired
  private var passwordEncoder: PasswordEncoder = _;

  /*
   * Configuration:
   */

  @Bean
  override def authenticationManager: AuthenticationManager = super.authenticationManager;

  @throws[Exception]
  override def configure(authenticationManagerBuilder: AuthenticationManagerBuilder): Unit = {

    log.info("Configuring application security manager.");

    authenticationManagerBuilder
      .userDetailsService(appUserDetailsService)
      .passwordEncoder(passwordEncoder);
  }

  @throws[Exception]
  override def configure(httpSecurity: HttpSecurity): Unit = {

    log.info("Configuring httpSecurity and session management.")

    httpSecurity
      .cors().disable()
      .csrf().disable();
    }

}
