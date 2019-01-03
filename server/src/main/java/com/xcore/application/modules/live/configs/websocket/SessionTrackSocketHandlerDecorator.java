package com.xcore.application.modules.live.configs.websocket;

import com.xcore.application.modules.authentication.models.user.ApplicationUser;
import com.xcore.application.modules.live.services.LiveService;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.WebSocketHandlerDecorator;

public class SessionTrackSocketHandlerDecorator extends WebSocketHandlerDecorator {

  private final LiveService liveService;

  SessionTrackSocketHandlerDecorator(final WebSocketHandler delegate, final LiveService liveService) {
    super(delegate);
    this.liveService = liveService;
  }

  @Override
  public void afterConnectionEstablished(final WebSocketSession session) throws Exception {

    OAuth2Authentication principal = (OAuth2Authentication)session.getPrincipal();

    if (principal != null) {
      liveService.createLiveSession(session.getId(), (ApplicationUser) principal.getPrincipal());
      getDelegate().afterConnectionEstablished(session);
    } else {
      throw new SecurityException("Failed to initialize live session, no auth provided.");
    }
  }

  @Override
  public void afterConnectionClosed(final WebSocketSession session, final CloseStatus closeStatus) throws Exception {

    OAuth2Authentication principal = (OAuth2Authentication)session.getPrincipal();

    if (principal != null && !closeStatus.equals(CloseStatus.SERVER_ERROR)) {
      liveService.removeLiveSession(session.getId());
    }

    getDelegate().afterConnectionClosed(session, closeStatus);
  }

}
