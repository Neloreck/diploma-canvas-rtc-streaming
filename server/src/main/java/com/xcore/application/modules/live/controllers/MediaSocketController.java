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
public final class MediaSocketController {

  @Autowired
  private MediaService kurentoMediaService;

  /*
   * Handlers:
   */

  /* RECORD: */

  @MessageMapping("/live.{user}.record.start")
  public void onStartRecord(@DestinationVariable final String user, @Payload final LiveWebSocketMessage<LiveSdpMessage> message, final SimpMessageHeaderAccessor headerAccessor) {
    kurentoMediaService.handleStartRecord(user, headerAccessor.getSessionId());
  }

  @MessageMapping("/live.{user}.record.stop")
  public void onStopRecord(@DestinationVariable final String user, @Payload final LiveWebSocketMessage<LiveSdpMessage> message, final SimpMessageHeaderAccessor headerAccessor) {
    kurentoMediaService.handleStopRecord(user, headerAccessor.getSessionId());
  }

  /* SESSION: */

  @MessageMapping("/live.{user}.session.complete")
  public void onComplete(@DestinationVariable final String user, @Payload final LiveWebSocketMessage<LiveSdpMessage> message, final SimpMessageHeaderAccessor headerAccessor) {
    kurentoMediaService.handleComplete(user, headerAccessor.getSessionId());
  }

  @MessageMapping("/live.{user}.session.sdpOffer")
  public void onSdpOffer(@DestinationVariable final String user, @Payload final LiveWebSocketMessage<LiveSdpMessage> message, final SimpMessageHeaderAccessor headerAccessor) {
    kurentoMediaService.handleSdpOffer(user, headerAccessor.getSessionId(), message.getBody().getSdp());
  }

  @MessageMapping("/live.{user}.session.iceCandidate")
  public void onIceCandidate(@DestinationVariable final String user, @Payload final LiveWebSocketMessage<LiveICECandidateMessage> message, final SimpMessageHeaderAccessor headerAccessor) {
    kurentoMediaService.handleIceCandidate(user, headerAccessor.getSessionId(), message.getBody().getIceCandidate());
  }

  @MessageMapping("/live.{user}.session.stop")
  public void onStop(@DestinationVariable final String user, @Payload final LiveWebSocketMessage message, final SimpMessageHeaderAccessor headerAccessor) {
    kurentoMediaService.handleStop(user, headerAccessor.getSessionId());
  }

  @MessageMapping("/live.{user}.session.error")
  public void onError(@DestinationVariable final String user, @Payload final LiveWebSocketMessage message, final SimpMessageHeaderAccessor headerAccessor) {
    kurentoMediaService.handleError(user, headerAccessor.getSessionId(), message.getBody().toString());
  }

}
