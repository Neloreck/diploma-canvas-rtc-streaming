package com.xcore.application.modules.live.services;

import com.xcore.application.modules.live.configs.LiveMediaConfig;
import com.xcore.application.modules.live.exceptions.SessionInitializationException;
import com.xcore.application.modules.live.models.sessions.LiveStreamingSession;
import com.xcore.application.modules.storage.configs.StorageConfiguration;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.kurento.client.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j(topic = "[💣 LIVE MEDIA SERVICE]")
@Service
public final class LiveMediaService {

  @Autowired
  private LiveSessionService liveSessionService;

  @Autowired
  private LiveMessagingService liveMessagingService;

  @Autowired
  private KurentoClient kurentoClient;

  @Autowired
  private StorageConfiguration storageConfiguration;

  @Autowired
  private LiveMediaConfig mediaConfig;

  /*
   * Methods:
   */

  public void handleComplete(@NonNull final String room, @NonNull final String sessionId) {

    final LiveStreamingSession liveStreamingSession = liveSessionService.getSession(sessionId);

    liveStreamingSession.finishExchange();
    liveStreamingSession.tryApplyAccumulatedRemoteCandidates();

    this.liveMessagingService.sendExchangeCompleted(room);
  }

  public void handleIceCandidate(@NonNull final String room, @NonNull final String sessionId, @NonNull final IceCandidate iceCandidate) {

    final LiveStreamingSession liveSession = liveSessionService.getSession(sessionId);

    liveSession.accumulateRemoteIceCandidate(iceCandidate);
    liveSession.tryApplyAccumulatedRemoteCandidates();
  }

  public void handleSdpOffer(@NonNull final String room, @NonNull final String sessionId, @NonNull final String sdpOffer) {

    final LiveStreamingSession liveSession = liveSessionService.getSession(sessionId);

    try {

      // Initialize session.
      liveSession.initialize(
          kurentoClient.createMediaPipeline(), liveMessagingService,
          mediaConfig.getVideoSaveFormat(),
          this.getStreamRecordPath("user_" + liveSession.getOwnerId() + "/" + liveSession.getId() + "." + liveSession.getCreated().getTime())
      );

      // Proceed sdp and start recorder.
      final String sdpAnswer = liveSession.proceedSDPOffer(sdpOffer);

      // Send sdp answer.
      this.liveMessagingService.sendSdpAnswer(room, sdpAnswer);

    } catch (SessionInitializationException ex) {
      this.handleStop(room, sessionId, ex.getMessage());
    }
  }

  public void handleStartRecord(@NonNull final String room, @NonNull final String sessionId) {
    this.liveSessionService.getSession(sessionId).startRecord();
  }

  public void handleStopRecord(@NonNull final String room, @NonNull final String sessionId) {
    this.liveSessionService.getSession(sessionId).stopRecord();
  }

  public void handleStop(@NonNull final String room, @NonNull final String sessionId, final String cause) {
    liveSessionService.getSession(sessionId).close();
  }

  public void handleError(@NonNull final String room, @NonNull final String sessionId, @NonNull final String webSocketMessage) {

    log.error("Got live error: '{}'.", webSocketMessage);

    this.handleStop(room, sessionId, webSocketMessage);
  }

  private String getStreamRecordPath(final String fileName) {
    return "file://" + this.storageConfiguration.getStreamsStorageLocation() + fileName + ".mp4";
  }

}
