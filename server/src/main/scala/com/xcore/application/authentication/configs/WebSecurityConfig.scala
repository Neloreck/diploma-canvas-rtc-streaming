package com.xcore.application.authentication.configs;

import com.xcore.application.authentication.exceptions.AuthAccessDeniedHandler;
import com.xcore.server.configs.ApplicationConfig;
import org.springframework.context.annotation.{Bean, Configuration};
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import com.xcore.application.authentication.services.jwt.JwtTokenProvider;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.beans.factory.BeanInitializationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;

/*
 * Docs:
 * https://docs.spring.io/spring-security/site/docs/current/reference/html/jc.html
 */

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  private var applicationConfig: ApplicationConfig = _;

  @Autowired
  private val authenticationEntryPoint: AuthenticationEntryPoint = _;

  @Autowired
  private val userDetailsService: UserDetailsService = _;

  @Autowired
  private val jwtTokenProvider: JwtTokenProvider = _;

  @Autowired
  private var authAccessDeniedHandler: AuthAccessDeniedHandler = _;

  /*
   * Beans:
   */

  @Bean
  @throws[Exception]
  override def authenticationManagerBean: AuthenticationManager = super.authenticationManagerBean;

  @Bean
  def passwordEncoder: BCryptPasswordEncoder = new BCryptPasswordEncoder;

  /*

  todo:

  @Bean
  def secretKeyCacheStore: SecretKeyCacheStore = {
    new SecretKeyCacheStore(Caffeine.newBuilder.expireAfterWrite(1, TimeUnit.HOURS).build);
  }

  @Bean
  @Profile(Array("local"))
  def codeSendingServiceDev(codeGenerator: CodeGenerator) = new Nothing(codeGenerator);

  @Bean
  @Profile(Array("prod"))
  def codeSendingService(codeGenerator: CodeGenerator, emailService: Nothing) = new Nothing(codeGenerator, emailService);

   */

  /*
   * Configuration:
   */

  @Autowired
  def configureGlobal(authenticationManagerBuilder: AuthenticationManagerBuilder): Unit = {

    try {
      val authProvider = new DaoAuthenticationProvider();

      authProvider.setUserDetailsService(userDetailsService);
      authProvider.setPasswordEncoder(passwordEncoder);

      authenticationManagerBuilder.authenticationProvider(authProvider);
    } catch {
      case e: Exception =>
        throw new BeanInitializationException("Security configuration failed", e);
    }
  }

  @Override
  @throws[Exception]
  protected override def configure(httpSecurity: HttpSecurity): Unit = {

    // Disable csrf because we will use token for our api requests.
    httpSecurity
      .csrf().disable()
      .cors().disable();

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
