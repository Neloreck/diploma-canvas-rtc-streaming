package com.xcore.server.configs.websocket;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/*
 * Application-level broker configuration.
 */
@Configuration
@Order(Ordered.HIGHEST_PRECEDENCE + 5)
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Value("${spring.rabbitmq.username}")
  private String username;

  @Value("${spring.rabbitmq.password}")
  private String password;

  @Value("${spring.rabbitmq.port}")
  private Integer port;

  @Value("${spring.rabbitmq.host}")
  private String host;

  @Override
  public void configureMessageBroker(final MessageBrokerRegistry config) {
    config
        .setApplicationDestinationPrefixes("/app");

    config
        .enableStompBrokerRelay("/topic")
        .setRelayHost(host)
        .setRelayPort(port)
        .setClientLogin(username)
        .setClientPasscode(password);
  }

}
