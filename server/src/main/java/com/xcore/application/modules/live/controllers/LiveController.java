package com.xcore.application.modules.live.controllers;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class LiveController {

  @MessageMapping("/status.{user}")
  @SendTo("/topic/status.{user}")
  public String send(@DestinationVariable String user, String message) {
    return "Got on user " + user + " : " + message;
  }

}
