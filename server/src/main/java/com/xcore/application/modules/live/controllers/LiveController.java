package com.xcore.application.modules.live.controllers;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class LiveController {

  @MessageMapping("/live.{user}.status")
  @SendTo("/topic/live.{user}.status")
  public String onStatus(@DestinationVariable String user, @Payload String message, SimpMessageHeaderAccessor headerAccessor) {
    return "Answer placeholder.";
  }

}
