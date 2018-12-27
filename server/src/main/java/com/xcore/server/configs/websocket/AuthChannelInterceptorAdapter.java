package com.xcore.server.configs.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.stereotype.Component;

import java.security.Principal;

@Component
public class AuthChannelInterceptorAdapter implements ChannelInterceptor {

  @Autowired
  private TokenStore tokenStore;

  @Override
  public Message<?> preSend(final Message<?> message, final MessageChannel channel) throws AuthenticationException {

    final StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
    final StompCommand command = accessor.getCommand();

    if (command.equals(StompCommand.CONNECT)) {

      final String token = accessor.getFirstNativeHeader("access_token");

      if (token != null) {

        OAuth2Authentication authentication = tokenStore.readAuthentication(token);

        if (authentication != null) {
          accessor.setUser((Principal)authentication.getPrincipal());
        } else {
          throw new AuthenticationCredentialsNotFoundException("Valid token must be provided for socket connection.");
        }

      } else {
        throw new AuthenticationCredentialsNotFoundException("Valid token must be provided for socket connection.");
      }
    }

    return message;
  }
}