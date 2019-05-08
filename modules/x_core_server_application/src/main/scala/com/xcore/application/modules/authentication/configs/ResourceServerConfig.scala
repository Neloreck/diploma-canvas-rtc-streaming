package com.xcore.application.modules.authentication.configs

import org.codehaus.jackson.map.ObjectMapper
import org.slf4j.{Logger, LoggerFactory}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.{Bean, Configuration, Primary}
import org.springframework.security.access.AccessDeniedException
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.AuthenticationException
import org.springframework.security.oauth2.config.annotation.web.configuration.{EnableResourceServer, ResourceServerConfigurerAdapter}
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.security.web.access.AccessDeniedHandler
import javax.servlet.ServletException
import javax.servlet.http.{HttpServletRequest, HttpServletResponse}
import java.io.IOException

import com.xcore.server.controllers.rest.exchange.FailedApiResponse
import org.springframework.security.oauth2.provider.token.{DefaultTokenServices, TokenStore}

@Configuration
@EnableResourceServer
class ResourceServerConfig extends ResourceServerConfigurerAdapter {

  private val log: Logger = LoggerFactory.getLogger("[🔒SECURITY]");

  @Autowired
  private var webSecurityOptions: WebSecurityOptions = _;

  @Autowired
  private var accessTokenStore: TokenStore = _;

  @Bean
  @Primary
  def getAccessTokenServices: DefaultTokenServices = {

    val defaultTokenServices: DefaultTokenServices = new DefaultTokenServices;

    defaultTokenServices.setTokenStore(accessTokenStore);
    defaultTokenServices.setSupportRefreshToken(true);

    defaultTokenServices;
  }

  /*
   * Configuration:
   */

  override def configure(resourceServerSecurityConfigurer: ResourceServerSecurityConfigurer): Unit = {

    log.info("Configuring resourceServerSecurity and token storage.")

    resourceServerSecurityConfigurer
      .resourceId(webSecurityOptions.SERVER_APPLICATION_ID)
      .tokenServices(this.getAccessTokenServices);
  }

  @throws[Exception]
  override def configure(httpSecurity: HttpSecurity): Unit = {

    log.info("Configuring httpSecurity and session management.")

    httpSecurity
      .sessionManagement()
      .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    httpSecurity
      .csrf
        .disable
      .cors;

    httpSecurity
      .authorizeRequests()
        .antMatchers("/api/**").authenticated();

    httpSecurity
      .exceptionHandling()
        .accessDeniedHandler(new AuthAccessDeniedHandler())
        .authenticationEntryPoint(new AuthAccessDeniedHandler());
  }

  /*
   * Handle unauthorized requests etc.
   */
  private class AuthAccessDeniedHandler extends AccessDeniedHandler with AuthenticationEntryPoint {

    @throws[IOException]
    @throws[ServletException]
    override def commence(request: HttpServletRequest, response: HttpServletResponse, exception: AuthenticationException): Unit = {

      log.error(s"Failed to [${request.getMethod}] resource on [${request.getRequestURI}]. Authentication required.");

      val mapper: ObjectMapper = new ObjectMapper();

      val responseMsg = mapper.writeValueAsString(new FailedApiResponse("Full authentication is required to access this resource"));

      response.setStatus(403);
      response.getWriter.write(responseMsg);
    }

    @throws[IOException]
    @throws[ServletException]
    override def handle(request: HttpServletRequest, response: HttpServletResponse, exception: AccessDeniedException): Unit = {

      log.error(s"Failed to [${request.getMethod}] resource on [${request.getRequestURI}]. Authentication required.");

      val mapper: ObjectMapper = new ObjectMapper();
      val responseMsg = mapper.writeValueAsString(new FailedApiResponse("Full authentication is required to access this resource"));

      response.setStatus(403);
      response.getWriter.write(responseMsg);
    }

  }

}
