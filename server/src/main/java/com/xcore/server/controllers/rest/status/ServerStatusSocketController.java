package com.xcore.server.controllers.rest.status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ServerStatusSocketController {

  @Autowired
  private SimpMessagingTemplate messagingTemplate;

  @GetMapping("/test")
  private String test() {
    return "test";
  }

  @MessageMapping("/test")
  public void handleTestMessage() {
  }


}
