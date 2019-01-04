package com.xcore.application.modules.live.controllers;

import com.xcore.application.modules.live.models.messages.LiveICECandidateMessage;
import com.xcore.application.modules.live.models.messages.LiveSdpMessage;
import com.xcore.application.modules.live.models.messages.LiveWebSocketMessage;
import com.xcore.application.modules.live.services.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public final class MediaController {

  @Autowired
  private MediaService kurentoMediaService;

  /*
   * Handlers:
   */

  @MessageMapping("/live.{user}.complete")
  public void onComplete(@DestinationVariable final String user, @Payload final LiveWebSocketMessage<LiveSdpMessage> message, final SimpMessageHeaderAccessor headerAccessor) {
    kurentoMediaService.handleComplete(user, headerAccessor.getSessionId());
  }

  @MessageMapping("/live.{user}.sdpOffer")
  public void onSdpOffer(@DestinationVariable final String user, @Payload final LiveWebSocketMessage<LiveSdpMessage> message, final SimpMessageHeaderAccessor headerAccessor) {
    kurentoMediaService.handleSdpOffer(user, headerAccessor.getSessionId(), message.getBody().getSdp());
  }

  @MessageMapping("/live.{user}.iceCandidate")
  public void onIceCandidate(@DestinationVariable final String user, @Payload final LiveWebSocketMessage<LiveICECandidateMessage> message, final SimpMessageHeaderAccessor headerAccessor) {
    kurentoMediaService.handleIceCandidate(user, headerAccessor.getSessionId(), message.getBody().getIceCandidate());
  }

  @MessageMapping("/live.{user}.stop")
  public void onStop(@DestinationVariable final String user, @Payload final LiveWebSocketMessage message, final SimpMessageHeaderAccessor headerAccessor) {
    kurentoMediaService.handleStop(user, headerAccessor.getSessionId());
  }

  @MessageMapping("/live.{user}.error")
  public void onError(@DestinationVariable final String user, @Payload final LiveWebSocketMessage message, final SimpMessageHeaderAccessor headerAccessor) {
    kurentoMediaService.handleError(user, headerAccessor.getSessionId(), message.getBody().toString());
  }

}
