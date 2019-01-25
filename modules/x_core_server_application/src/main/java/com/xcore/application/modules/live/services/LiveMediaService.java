package com.xcore.application.modules.live.services;

import com.xcore.application.modules.live.configs.LiveMediaConfig;
import com.xcore.application.modules.live.exceptions.event.EventNotFoundException;
import com.xcore.application.modules.live.exceptions.session.*;
import com.xcore.application.modules.live.models.sessions.LiveStreamingSession;
import com.xcore.application.modules.storage.configs.StorageConfiguration;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.kurento.client.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j(topic = "[💣 LIVE MEDIA SERVICE]")
@Service
public final class LiveMediaService {

  @Autowired
  private LiveSessionService liveSessionService;

  @Autowired
  private LiveEventService liveEventService;

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

  public void handleComplete(@NonNull final String room, @NonNull final String socketSessionId) {

    final LiveStreamingSession liveStreamingSession = liveSessionService.getSession(socketSessionId);

    liveStreamingSession.finishExchange();
    liveStreamingSession.tryApplyAccumulatedRemoteCandidates();

    this.liveMessagingService.sendExchangeCompleted(room);
  }

  public void handleIceCandidate(@NonNull final String room, @NonNull final String socketSessionId, @NonNull final IceCandidate iceCandidate) {

    final LiveStreamingSession liveSession = liveSessionService.getSession(socketSessionId);

    liveSession.accumulateRemoteIceCandidate(iceCandidate);
    liveSession.tryApplyAccumulatedRemoteCandidates();
  }

  public void handleSdpOffer(@NonNull final String room, @NonNull final String socketSessionId, @NonNull final String sdpOffer) {

    final LiveStreamingSession liveSession = liveSessionService.getSession(socketSessionId);

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

    } catch (SessionAlreadyInitializedException | SessionAlreadyStartedException | SessionDisposedException ex) {
      this.handleStop(room, socketSessionId, ex.getMessage());
    } catch (SessionNotInitializedException ex) {
      log.error("[{}] Unexpected error: '{}'.", liveSession, ex.getMessage());
      this.handleStop(room, socketSessionId, ex.getMessage());
    }
  }

  public void handleStartRecord(@NonNull final String room, @NonNull final String socketSessionId, @NonNull final UUID eventId) {
    try {

      final LiveStreamingSession liveStreamingSession = this.liveSessionService.getSession(socketSessionId);

      liveStreamingSession.setLiveEventId(eventId);
      liveStreamingSession.startRecord();

    } catch (SessionDisposedException | SessionRecordedException | SessionAlreadyRecordingException | SessionNotInitializedException | SessionNotStartedException ex) {
      this.handleError(room, socketSessionId, ex);
    }
  }

  public void handleStopRecord(@NonNull final String room, @NonNull final String socketSessionId) {
    try {

      final LiveStreamingSession liveStreamingSession = this.liveSessionService.getSession(socketSessionId);

      this.liveEventService.setFinished(liveStreamingSession.getLiveEventId());

      liveStreamingSession.stopRecord();

    } catch (EventNotFoundException | SessionNotStartedException | SessionNotInitializedException | SessionDisposedException | SessionRecordedException ex) {
      this.handleError(room, socketSessionId, ex);
    }
  }

  public void handleStop(@NonNull final String room, @NonNull final String socketSessionId, final String cause) {
    try {
      liveSessionService.getSession(socketSessionId).close();
    } catch (SessionRecordedException | SessionNotInitializedException | SessionNotStartedException | SessionDisposedException ex) {
      this.handleError(room, socketSessionId, ex);
    }
  }

  /*
   * Handle error:
   */

  public void handleError(@NonNull final String room, @NonNull final String socketSessionId, @NonNull final Exception exception) {
    this.handleError(room, socketSessionId, exception.getMessage());
  }

  public void handleError(@NonNull final String room, @NonNull final String socketSessionId, @NonNull final String errorMessage) {

    log.error("Got live error: '{}'.", errorMessage);

    liveMessagingService.sendError(room, errorMessage);
  }

  /*
   * Utils:
   */

  private String getStreamRecordPath(final String fileName) {
    return "file://" + this.storageConfiguration.getStreamsStorageLocation() + fileName + ".mp4";
  }

}
