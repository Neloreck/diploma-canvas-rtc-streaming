package com.xcore.application.authentication.configs

import java.io.IOException

import com.xcore.server.controllers.rest.exchange.ErrorApiResponse
import javax.servlet.ServletException
import javax.servlet.http.{HttpServletRequest, HttpServletResponse}
import org.codehaus.jackson.map.ObjectMapper
import org.slf4j.{Logger, LoggerFactory}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.security.access.AccessDeniedException
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.AuthenticationException
import org.springframework.security.oauth2.config.annotation.web.configuration.{EnableResourceServer, ResourceServerConfigurerAdapter}
import org.springframework.security.oauth2.provider.token.DefaultTokenServices
import org.springframework.security.oauth2.provider.token.TokenStore
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.security.web.access.AccessDeniedHandler

@Configuration
@EnableResourceServer
class ResourceServerConfig extends ResourceServerConfigurerAdapter {

  private val log: Logger = LoggerFactory.getLogger("[🔒SECURITY]");

  @Autowired
  private var webSecurityConstants: WebSecurityConstants = _;

  @Autowired
  private var tokenServices: DefaultTokenServices = _;

  @Autowired
  private var tokenStore: TokenStore = _;

  /*
   * Configuration:
   */

  override def configure(resourceServerSecurityConfigurer: ResourceServerSecurityConfigurer): Unit = {

    log.info("Configuring resourceServerSecurity and token storage.")

    resourceServerSecurityConfigurer
      .resourceId(webSecurityConstants.SERVER_APPLICATION_ID)
      .tokenServices(tokenServices)
      .tokenStore(tokenStore);
  }

  @throws[Exception]
  override def configure(httpSecurity: HttpSecurity): Unit = {

    log.info("Configuring httpSecurity and session management.")

    httpSecurity
      .sessionManagement()
      .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    httpSecurity
      .csrf()
        .disable()
      .cors()
        .disable();

    httpSecurity
      .authorizeRequests()
      .antMatchers("/api/auth/**").permitAll()
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
      val responseMsg = mapper.writeValueAsString(new ErrorApiResponse("Full authentication is required to access this resource"));

      response.setStatus(403);
      response.getWriter.write(responseMsg);
    }

    @throws[IOException]
    @throws[ServletException]
    override def handle(request: HttpServletRequest, response: HttpServletResponse, exception: AccessDeniedException): Unit = {

      log.error(s"Failed to [${request.getMethod}] resource on [${request.getRequestURI}]. Authentication required.");

      val mapper: ObjectMapper = new ObjectMapper();
      val responseMsg = mapper.writeValueAsString(new ErrorApiResponse("Full authentication is required to access this resource"));

      response.getWriter.write(responseMsg);
    }

  }

}
