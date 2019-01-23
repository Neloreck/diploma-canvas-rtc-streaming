package com.xcore.application.modules.live.configs.websocket;

import com.xcore.application.modules.live.services.LiveSessionService;
import com.xcore.server.configs.websocket.SocketHandshakeInterceptor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

@Configuration
@Slf4j(topic = "[SOCKET CONFIG]")
@Order(Ordered.LOWEST_PRECEDENCE - 10)
public class LiveWebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Autowired
  private LiveSessionService liveSessionService;

  // Endpoints declaration.

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {

    log.info("Added live websocket endpoint.");

    registry.
      addEndpoint("/websocket/live")
        .setAllowedOrigins("*")
        .setHandshakeHandler(new SocketHandshakeInterceptor())
        .withSockJS()
        .setStreamBytesLimit(512 * 1024)
        .setHttpMessageCacheSize(1000)
        .setDisconnectDelay(30 * 1000L);
  }

  @Override
  public void configureWebSocketTransport(final WebSocketTransportRegistration registration) {
    registration.addDecoratorFactory(
        delegate -> new SessionTrackSocketHandlerDecorator(delegate, liveSessionService)
    );
  }

}
