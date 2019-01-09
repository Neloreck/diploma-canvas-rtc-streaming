package com.xcore.application.modules.live.controllers;

import com.xcore.application.modules.live.models.sessions.LiveStreamingSession;
import com.xcore.application.modules.live.services.LiveSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/live/event")
public class LiveSessionRestController {

  @Autowired
  private LiveSessionService liveSessionService;

  @GetMapping("/")
  public LiveStreamingSession getSessionInfo(@PathVariable String sessionId) {
    return liveSessionService.getSession(sessionId);
  }

}
