package com.xcore.application.modules.live.controllers.media;

import com.xcore.application.modules.live.models.messages.LiveICECandidateMessage;
import com.xcore.application.modules.live.models.messages.LiveSdpMessage;
import com.xcore.application.modules.live.models.messages.LiveStartMessage;
import com.xcore.application.modules.live.models.messages.LiveWebSocketMessage;
import com.xcore.application.modules.live.services.LiveMediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public final class LiveMediaSocketController {

  @Autowired
  private LiveMediaService liveMediaService;

  /*
   * Handlers:
   */

  /* RECORD: */

  @MessageMapping("/live.{eventId}.record.start")
  public void onStartRecord(@DestinationVariable final String eventId, @Payload final LiveWebSocketMessage<LiveStartMessage> message, final SimpMessageHeaderAccessor headerAccessor) {
    liveMediaService.handleStartRecord(eventId, headerAccessor.getSessionId(), message.getBody().getEventId());
  }

  @MessageMapping("/live.{eventId}.record.stop")
  public void onStopRecord(@DestinationVariable final String eventId, @Payload final LiveWebSocketMessage<Object> message, final SimpMessageHeaderAccessor headerAccessor) {
    liveMediaService.handleStopRecord(eventId, headerAccessor.getSessionId());
  }

  /* SESSION: */

  @MessageMapping("/live.{eventId}.session.complete")
  public void onComplete(@DestinationVariable final String eventId, @Payload final LiveWebSocketMessage<LiveSdpMessage> message, final SimpMessageHeaderAccessor headerAccessor) {
    liveMediaService.handleComplete(eventId, headerAccessor.getSessionId());
  }

  @MessageMapping("/live.{eventId}.session.sdpOffer")
  public void onSdpOffer(@DestinationVariable final String eventId, @Payload final LiveWebSocketMessage<LiveSdpMessage> message, final SimpMessageHeaderAccessor headerAccessor) {
    liveMediaService.handleSdpOffer(eventId, headerAccessor.getSessionId(), message.getBody().getSdp());
  }

  @MessageMapping("/live.{eventId}.session.iceCandidate")
  public void onIceCandidate(@DestinationVariable final String eventId, @Payload final LiveWebSocketMessage<LiveICECandidateMessage> message, final SimpMessageHeaderAccessor headerAccessor) {
    liveMediaService.handleIceCandidate(eventId, headerAccessor.getSessionId(), message.getBody().getIceCandidate());
  }

  @MessageMapping("/live.{eventId}.session.stop")
  public void onStop(@DestinationVariable final String eventId, @Payload final LiveWebSocketMessage message, final SimpMessageHeaderAccessor headerAccessor) {
    liveMediaService.handleStop(eventId, headerAccessor.getSessionId(), message.getBody().toString());
  }

  @MessageMapping("/live.{eventId}.session.error")
  public void onError(@DestinationVariable final String eventId, @Payload final LiveWebSocketMessage message, final SimpMessageHeaderAccessor headerAccessor) {
    liveMediaService.handleError(eventId, headerAccessor.getSessionId(), message.getBody().toString());
  }

}
