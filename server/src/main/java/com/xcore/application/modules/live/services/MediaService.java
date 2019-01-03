package com.xcore.application.modules.live.services;

import com.xcore.application.modules.live.models.LiveStreamingSession;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.kurento.client.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j(topic = "[💣 MEDIA SERVICE]")
public final class MediaService {

  @Autowired
  private LiveService liveService;

  @Autowired
  private LiveMessagingService liveMessagingService;

  @Autowired
  private KurentoClient kurentoClient;

  /*
   * Methods:
   */

  public void handleComplete(@NonNull final String room, @NonNull final String sessionId) {

    final LiveStreamingSession liveStreamingSession = liveService.getSession(sessionId);

    liveStreamingSession.setExchanged(true);
    liveStreamingSession.tryApplyAccumulatedRemoteCandidates();
  }

  public void handleIceCandidate(@NonNull final String room, @NonNull final String sessionId, @NonNull final IceCandidate iceCandidate) {

    final LiveStreamingSession liveSession = liveService.getSession(sessionId);

    liveSession.accumulateRemoteIceCandidate(iceCandidate);
    liveSession.tryApplyAccumulatedRemoteCandidates();
  }

  public void handleSdpOffer(@NonNull final String room, @NonNull final String sessionId, @NonNull final String sdpOffer) {

    final LiveStreamingSession liveSession = liveService.getSession(sessionId);

    // Initialize session.
    liveSession.initialize(kurentoClient.createMediaPipeline(), liveMessagingService);

    // Proceed sdp and start recorder.
    final String sdpAnswer = liveSession.start(sdpOffer);

    // Send sdp answer.
    this.liveMessagingService.sendSdpAnswer(room, sdpAnswer);
  }

  public void handleStop(@NonNull final String room, @NonNull final String sessionId) {
    liveService.getSession(sessionId).stop();
  }

  public void handleError(@NonNull final String room, @NonNull final String sessionId, @NonNull final String webSocketMessage) {

    log.error("Got live error: '{}'.", webSocketMessage);

    // todo;
    this.handleStop(room, sessionId);
  }

}
