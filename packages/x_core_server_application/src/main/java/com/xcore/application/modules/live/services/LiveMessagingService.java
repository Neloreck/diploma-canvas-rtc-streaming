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

  public void sendRecordStart(final String room) {
    this.sendMessage(room, "record.start", EKurrentoMessageType.RECORD_START, null);
  }

  public void sendRecordStop(final String room) {
    this.sendMessage(room, "record.stop", EKurrentoMessageType.RECORD_STOP, null);
  }

  public void sendExchangeCompleted(final String room) {
    this.sendMessage(room, "session.complete", EKurrentoMessageType.EXCHANGE_COMPLETED, null);
  }

  public void sendSdpAnswer(final String room, final String sdpAnswer) {
    this.sendMessage(room, "session.sdpAnswer", EKurrentoMessageType.SDP_ANSWER, new LiveSdpMessage(sdpAnswer));
  }

  public void sendIceCandidate(final String room, final IceCandidate iceCandidate) {
    this.sendMessage(room, "session.iceCandidate", EKurrentoMessageType.ICE_CANDIDATE_FOUND, new LiveICECandidateMessage(iceCandidate));
  }

  public void sendError(final String room, final String errorMessage) {
    this.sendMessage(room, "session.error", EKurrentoMessageType.ERROR, new LiveErrorMessage(errorMessage));
  }

  protected <T>void sendMessage(final String room, final String destination, final EKurrentoMessageType messageType, T body) {
    this.simpMessagingTemplate.convertAndSend(
        DESTINATION_PREFIX + "." + room + "." + destination,
        LiveWebSocketMessage.builder().type(messageType.getType()).body(body).build()
    );
  }

}
