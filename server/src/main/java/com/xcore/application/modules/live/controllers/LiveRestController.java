package com.xcore.application.modules.live.controllers;

import com.xcore.application.modules.live.models.LiveStreamingSession;
import com.xcore.application.modules.live.services.LiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class LiveRestController {

  @Autowired
  private LiveService liveService;

  @GetMapping("/session/{sessionId}")
  public LiveStreamingSession getSessionInfo(@PathVariable String sessionId) {
    return liveService.getSession(sessionId);
  }

}
