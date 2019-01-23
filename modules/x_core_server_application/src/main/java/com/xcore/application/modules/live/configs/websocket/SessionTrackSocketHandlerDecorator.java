package com.xcore.application.modules.live.configs.websocket;

import com.xcore.application.modules.authentication.models.user.ApplicationUser;
import com.xcore.application.modules.live.services.LiveSessionService;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.WebSocketHandlerDecorator;

public class SessionTrackSocketHandlerDecorator extends WebSocketHandlerDecorator {

  private final LiveSessionService liveSessionService;

  SessionTrackSocketHandlerDecorator(final WebSocketHandler delegate, final LiveSessionService liveSessionService) {
    super(delegate);
    this.liveSessionService = liveSessionService;
  }

  @Override
  public void afterConnectionEstablished(final WebSocketSession session) throws Exception {

    OAuth2Authentication principal = (OAuth2Authentication)session.getPrincipal();

    if (principal != null) {
      liveSessionService.createLiveSession(session.getId(), (ApplicationUser) principal.getPrincipal());
      getDelegate().afterConnectionEstablished(session);
    } else {
      throw new SecurityException("Failed to initialize live session, no auth provided.");
    }
  }

  @Override
  public void afterConnectionClosed(final WebSocketSession session, final CloseStatus closeStatus) throws Exception {

    OAuth2Authentication principal = (OAuth2Authentication)session.getPrincipal();

    if (principal != null && !closeStatus.equals(CloseStatus.SERVER_ERROR)) {
      liveSessionService.removeLiveSession(session.getId());
    }

    getDelegate().afterConnectionClosed(session, closeStatus);
  }

}
