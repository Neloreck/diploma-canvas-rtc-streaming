package com.xcore.server.configs.websocket;

import lombok.extern.slf4j.Slf4j;
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
@Slf4j(topic = "[BROKER CONFIG]")
@Order(Ordered.HIGHEST_PRECEDENCE + 1)
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

    log.info("Connecting broker, url: '{}:{}', user: '{}'.", this.host, this.port, this.username);

    config
      .enableStompBrokerRelay("/topic")
      .setRelayHost(this.host)
      .setRelayPort(this.port)

      .setSystemLogin(this.username)
      .setSystemPasscode(this.password)

      .setClientLogin(this.username)
      .setClientPasscode(this.password);

    config
      .setApplicationDestinationPrefixes("/app");
  }

}
