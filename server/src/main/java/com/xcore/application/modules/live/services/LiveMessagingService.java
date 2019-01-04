package com.xcore.application.modules.live.services;

import com.xcore.application.modules.live.models.messages.EKurrentoMessageType;
import com.xcore.application.modules.live.models.messages.LiveErrorMessage;
import com.xcore.application.modules.live.models.messages.LiveICECandidateMessage;
import com.xcore.application.modules.live.models.messages.LiveSdpMessage;
import com.xcore.application.modules.live.models.messages.LiveWebSocketMessage;
import org.kurento.client.IceCandidate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class LiveMessagingService {

  private static final String DESTINATION_PREFIX = "/topic/live";

  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;

  public void sendSdpAnswer(final String room, final String sdpAnswer) {
    this.sendMessage(room, "sdpAnswer", EKurrentoMessageType.SDP_ANSWER, new LiveSdpMessage(sdpAnswer));
  }

  public void sendIceCandidate(final String room, final IceCandidate iceCandidate) {
    this.sendMessage(room, "iceCandidate", EKurrentoMessageType.ICE_CANDIDATE_FOUND, new LiveICECandidateMessage(iceCandidate));
  }

  public void sendError(final String room, final String errorMessage) {
    this.sendMessage(room, "error", EKurrentoMessageType.ERROR, new LiveErrorMessage(errorMessage));
  }

  protected <T>void sendMessage(final String room, final String destination, final EKurrentoMessageType messageType, T body) {
    this.simpMessagingTemplate.convertAndSend(
        DESTINATION_PREFIX + "." + room + "." + destination,
        LiveWebSocketMessage.builder().type(messageType.getType()).body(body).build()
    );
  }

}
