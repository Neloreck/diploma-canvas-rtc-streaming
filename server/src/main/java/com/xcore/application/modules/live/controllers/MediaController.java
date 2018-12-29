package com.xcore.application.modules.live.controllers;

import com.xcore.application.modules.live.models.messages.LiveSdpMessage;
import com.xcore.application.modules.live.models.messages.LiveWebSocketMessage;
import com.xcore.application.modules.live.services.MediaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j(topic = "[MEDIA CONTROLLER]")
public class MediaController {

  @Autowired
  private MediaService kurentoMediaService;

  /*
   * Process user SDP offer.
   */
  @MessageMapping("/live.{user}.sdpOffer")
  public void onSdpOffer(@DestinationVariable String user, @Payload LiveWebSocketMessage<LiveSdpMessage> message, final SimpMessageHeaderAccessor headerAccessor) {
    kurentoMediaService.processSdpOffer(user, headerAccessor.getSessionId(), message.getBody().getSdp());
  }

  /*
   * Process add ICE candidate.
   */
  @MessageMapping("/live.{user}.iceCandidate")
  public void onIceCandidate(@DestinationVariable String user, @Payload LiveWebSocketMessage message, final SimpMessageHeaderAccessor headerAccessor) {

    // todo: Get ICE.
    kurentoMediaService.processIceCandidate(user, headerAccessor.getSessionId(), null);
  }

  /*
   * Process stop command.
   */
  @MessageMapping("/live.{user}.stop")
  public void onStop(@DestinationVariable String user, @Payload LiveWebSocketMessage message, final SimpMessageHeaderAccessor headerAccessor) {
    kurentoMediaService.processStop(user, headerAccessor.getSessionId());
  }

  /*
   * Process error.
   */
  @MessageMapping("/live.{user}.error")
  public void onError(@DestinationVariable String user, @Payload LiveWebSocketMessage message, final SimpMessageHeaderAccessor headerAccessor) {
    kurentoMediaService.processError(user, headerAccessor.getSessionId(), message);
  }

}
