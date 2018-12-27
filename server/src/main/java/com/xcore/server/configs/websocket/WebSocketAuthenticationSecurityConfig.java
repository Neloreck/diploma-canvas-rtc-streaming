package com.xcore.server.configs.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class WebSocketAuthenticationSecurityConfig implements WebSocketMessageBrokerConfigurer {

  @Autowired
  private AuthChannelInterceptorAdapter authChannelInterceptorAdapter;

  public void registerStompEndpoints(final StompEndpointRegistry registry) {
    // Endpoints are already registered on WebSocketConfig, no need to add more.
  }

  public void configureClientInboundChannel(final ChannelRegistration registration) {
    registration.interceptors(authChannelInterceptorAdapter);
  }

}