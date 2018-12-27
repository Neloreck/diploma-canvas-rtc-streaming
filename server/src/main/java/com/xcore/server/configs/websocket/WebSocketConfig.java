package com.xcore.server.configs.websocket;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
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
  public void configureMessageBroker(MessageBrokerRegistry config) {
    config
        .setApplicationDestinationPrefixes("/app");

    config
        .enableStompBrokerRelay("/topic")
        .setRelayHost(host)
        .setRelayPort(port)
        .setClientLogin(username)
        .setClientPasscode(password);
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.
      addEndpoint("/websocket/live")
        .setAllowedOrigins("*")
        .withSockJS()
        .setStreamBytesLimit(512 * 1024)
        .setHttpMessageCacheSize(1000)
        .setDisconnectDelay(30 * 1000L);

    registry.
      addEndpoint("/websocket/another_one_for_future")
        .setAllowedOrigins("*")
        .withSockJS()
        .setStreamBytesLimit(512 * 1024)
        .setHttpMessageCacheSize(1000)
        .setDisconnectDelay(30 * 1000L);

  }

}
