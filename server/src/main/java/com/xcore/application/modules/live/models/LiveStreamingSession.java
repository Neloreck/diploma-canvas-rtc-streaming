package com.xcore.application.modules.live.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.xcore.application.modules.live.exceptions.SessionInitializationException;
import com.xcore.application.modules.live.services.LiveMessagingService;
import io.netty.util.internal.ConcurrentSet;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.kurento.client.*;

import java.util.*;

@Data
@Slf4j(topic = "[🍅 LIVE SESSION]")
public class LiveStreamingSession {

  private static final Integer MIN_STREAM_BANDWIDTH = 300;
  private static final Integer MAX_STREAM_BANDWIDTH = 5000;

  private static final Integer MIN_RECORD_STREAM_BANDWIDTH = 2000;
  private static final Integer MAX_RECORD_STREAM_BANDWIDTH = 2000;

  /*
   * Session data.
   */

  private final String id;
  private final Long ownerId;
  private final String messagingRoom;

  private final Date created = new Date();
  private Date lastActive = new Date();

  private String filePath;

  /*
   * Metadata.
   */

  private Boolean initialized = false;
  private Boolean disposed = false;
  private Boolean started = false;
  private Boolean recording = false;
  private Boolean recorded = false;
  private Boolean exchanged = false;

  private ConnectionState state = ConnectionState.DISCONNECTED;

  /*
   * Remote.
   */

  @JsonIgnore
  private MediaPipeline mediaPipeline = null;

  @JsonIgnore
  private WebRtcEndpoint webRtcEndpoint = null;

  @JsonIgnore
  private RecorderEndpoint recorderEndpoint = null;

  @JsonIgnore
  private Set<IceCandidate> accumulatedIceCandidates = new ConcurrentSet<>();

  public LiveStreamingSession(final String id, final String messagingRoom, final Long ownerId) {
    this.id = id;
    this.ownerId = ownerId;
    this.messagingRoom = messagingRoom;
  }

  /*
   * Management.
   */

  public void finishExchange() {

    this.triggerActivity();

    this.exchanged = true;

    log.info("Session exchanged successfully, id: '{}'.", this.id);
  }

  public void accumulateRemoteIceCandidate(final IceCandidate iceCandidate) {
    this.accumulatedIceCandidates.add(iceCandidate);
  }

  public void tryApplyAccumulatedRemoteCandidates() {
    if (!this.accumulatedIceCandidates.isEmpty() && this.exchanged) {
      this.accumulatedIceCandidates.forEach(it -> {
        this.accumulatedIceCandidates.remove(it);
        this.webRtcEndpoint.addIceCandidate(it);
      });
    }
  }

  /*
   * Main methods.
   */

  public String proceedSDPOffer(final String sdpOffer) {

    log.info("Start live session: '{}'.", id);

    this.triggerActivity();

    if (!this.initialized || this.started) {
      throw new SessionInitializationException();
    }

    String sdpAnswer = this.webRtcEndpoint.processOffer(sdpOffer);

    this.webRtcEndpoint.gatherCandidates();
    this.started = true;

    return sdpAnswer;
  }

  public void close() {

    log.info("Close live session: '{}'.", id);

    this.triggerActivity();

    if (this.started && this.initialized) {

      if (this.recording) {
        this.stopRecord();
      }

      this.started = false;
    } else {
      throw new RuntimeException("Failed to close stopped or not initialized session.");
    }
  }

  public void startRecord() {
    if (this.started && !this.disposed) {

      log.info("Starting stream record for '{}'.", this.id);

      this.recording = true;

      this.webRtcEndpoint.connect(recorderEndpoint, MediaType.VIDEO);
      this.webRtcEndpoint.connect(recorderEndpoint, MediaType.AUDIO);

      this.recorderEndpoint.record();
    } else {
      throw new RuntimeException("Session has not started or broken.");
    }
  }

  public void stopRecord() {
    if (this.started && !this.disposed) {

      log.info("Stopping stream record for '{}'.", this.id);

      this.recording = false;
      this.recorded = true;

      this.recorderEndpoint.stop();
      this.webRtcEndpoint.disconnect(this.recorderEndpoint);
    } else {
      throw new RuntimeException("Session has not started or broken.");
    }
  }

  /*
   * Life cycle.
   */

  public void initialize(final MediaPipeline mediaPipeline, final LiveMessagingService liveMessagingService,
                         final MediaProfileSpecType mediaProfileSpecType, final String filePath
  ) throws SessionInitializationException {

    this.triggerActivity();

    if (this.initialized || this.disposed) {
      throw new SessionInitializationException();
    } else {

      log.info("Initialize live session: '{}'.", id);

      this.filePath = filePath;
      this.mediaPipeline = mediaPipeline;
      this.webRtcEndpoint = new WebRtcEndpoint.Builder(mediaPipeline).recvonly().build();
      this.recorderEndpoint = new RecorderEndpoint
        .Builder(mediaPipeline, filePath)
        .stopOnEndOfStream()
        .withMediaProfile(mediaProfileSpecType)
        .build();

      this.mediaPipeline.setName("RTC_PIPELINE_ENDPOINT-" + id + "." + ownerId);
      this.webRtcEndpoint.setName("RTC_CONNECTION_ENDPOINT-" + id + "." + ownerId);
      this.recorderEndpoint.setName("RTC_RECORDER_ENDPOINT-" + id + "." + ownerId);

      this.configureBandwidth();

      log.info("Connected RTC endpoints for '{}', saved video will be stored as '{}'.", id, filePath);

      this.initializeBaseEventsListeners(liveMessagingService);
      this.initializeWebRtcEventsListeners(liveMessagingService);
      this.initializeWebRtcRecorderEventsListeners(liveMessagingService);

      this.initialized = true;

      log.info("Initialized live session: '{}', endpoints: '{}', '{}', '{}'.",
          id, this.mediaPipeline.getName(), this.webRtcEndpoint.getName(), this.recorderEndpoint.getName());
    }
  }

  private void configureBandwidth() {

    this.recorderEndpoint.setMinOutputBitrate(MIN_RECORD_STREAM_BANDWIDTH);
    this.webRtcEndpoint.setMinVideoRecvBandwidth(MIN_STREAM_BANDWIDTH);
    this.webRtcEndpoint.setMinVideoSendBandwidth(MIN_STREAM_BANDWIDTH);

    this.webRtcEndpoint.setMaxVideoRecvBandwidth(MAX_STREAM_BANDWIDTH);
    this.webRtcEndpoint.setMaxVideoSendBandwidth(MAX_STREAM_BANDWIDTH);
    this.recorderEndpoint.setMaxOutputBitrate(MAX_RECORD_STREAM_BANDWIDTH);

    this.webRtcEndpoint.setMaxAudioRecvBandwidth(MIN_STREAM_BANDWIDTH * 3);
  }

  private void initializeBaseEventsListeners(final LiveMessagingService liveMessagingService) {

    this.webRtcEndpoint.addConnectionStateChangedListener(event -> {
      log.info("[RTP]: Connection state changed. Session: {}, state: {}.", id, event.getNewState());
      this.setState(event.getNewState());
    });

    this.webRtcEndpoint.addErrorListener(event -> {
      log.info("[RTP] Got error, session: '{}', error: '{}'.", this.id, event.getDescription());
      liveMessagingService.sendError(this.messagingRoom, event.getDescription());
    });

    this.webRtcEndpoint.addElementConnectedListener(event -> log.info("[RTP] Element connected, id: '{}', type: '{}'.", this.id, event.getMediaType()));
    this.webRtcEndpoint.addElementDisconnectedListener(event -> log.info("[RTP] Element disconnected, id: '{}', type: '{}'.", this.id, event.getMediaType()));
    this.webRtcEndpoint.addMediaStateChangedListener(event -> log.info("[RTP] Media state change, id: '{}', type: '{}'.", this.id, event.getNewState()));
    this.webRtcEndpoint.addMediaSessionStartedListener(event -> log.info("[RTP] Session started, id: '{}'.", this.id));
    this.webRtcEndpoint.addMediaSessionTerminatedListener(event -> log.info("[RTP] Session terminated, id: '{}'.", this.id));
    this.webRtcEndpoint.addMediaFlowInStateChangeListener(event -> log.info("[RTP] Media is flowing into this sink."));
    this.webRtcEndpoint.addMediaFlowInStateChangeListener(event -> log.info("[RTP] Media is flowing into this sink."));
    this.webRtcEndpoint.addMediaFlowOutStateChangeListener(event -> log.info("[RTP] Media is flowing out of this source."));
    this.webRtcEndpoint.addMediaStateChangedListener(event -> log.info("[RTP] Media state changed."));
    this.webRtcEndpoint.addMediaTranscodingStateChangeListener(event -> log.info("[RTP] Media transcoding state changed."));
  }

  private void initializeWebRtcEventsListeners(final LiveMessagingService liveMessagingService) {
    this.webRtcEndpoint.addIceCandidateFoundListener(event -> liveMessagingService.sendIceCandidate(this.messagingRoom, event.getCandidate()));
    this.webRtcEndpoint.addIceComponentStateChangeListener(event -> log.info(
        "[RTC] ICE state change, id: '{}', state: '{}'.", this.id, event.getState().toString()
    ));
    this.webRtcEndpoint.addIceGatheringDoneListener(event -> log.info(
        "[RTC] ICE gathering done, id: '{}'.", this.id
    ));
    this.webRtcEndpoint.addNewCandidatePairSelectedListener(event -> log.info(
        "[RTC] ICE candidate pair selected, id: '{}', candidates: '{}', '{}'.",
        this.id, event.getCandidatePair().getLocalCandidate(), event.getCandidatePair().getRemoteCandidate()
    ));
  }

  private void initializeWebRtcRecorderEventsListeners(final LiveMessagingService liveMessagingService) {
    this.recorderEndpoint.addPausedListener(event -> log.info("[REC]: Paused stream, id: '{}'.", this.id));
    this.recorderEndpoint.addRecordingListener(event -> log.info("[REC]: Recording stream, id: '{}'.", this.id));
    this.recorderEndpoint.addStoppedListener(event -> log.info("[REC]: Stopped recording, id: '{}'.", this.id));
    this.recorderEndpoint.addMediaFlowInStateChangeListener(event -> log.info(
      "[REC]: Flow IN state changed, id: '{}', type: '{}', state: '{}'.",
      this.id, event.getState(), event.getMediaType(), event.getState()
    ));
    this.recorderEndpoint.addMediaFlowOutStateChangeListener(event -> log.info(
      "[REC]: Flow OUT state changed, id: '{}', type: '{}', state: '{}'.",
      this.id, event.getState(), event.getMediaType(), event.getState()
    ));
    this.recorderEndpoint.addMediaTranscodingStateChangeListener(event -> log.info(
      "[REC]: Media transcoding state changed, id: '{}', type: '{}', state: '{}'.",
      this.id, event.getState(), event.getMediaType(), event.getState()
    ));
    this.recorderEndpoint.addElementDisconnectedListener(event -> log.info(
      "[REC]: Element connected, id: '{}', type: '{}'.",
      this.id, event.getMediaType()
    ));
    this.recorderEndpoint.addElementConnectedListener(event -> log.info(
      "[REC]: Element connected, id: '{}', type: '{}'.",
      this.id, event.getMediaType()
    ));
    this.recorderEndpoint.addElementDisconnectedListener(event -> log.info(
      "[REC]: Element disconnected, id: '{}', type: '{}'.",
      this.id, event.getMediaType()
    ));
    this.recorderEndpoint.addErrorListener(event -> log.error(
      "[REC]: Got error, id: '{}', error: '{}'.", this.id, event.getDescription()
    ));
  }

  /*
   * Dispose.
   */

  public void dispose() {

    if (this.disposed) {
      return;
    }

   /* log.info("Disposing live session: '{}'.", this.id);

    try {
      this.releaseResources();

      this.webRtcEndpoint = null;
      this.recorderEndpoint = null;
      this.mediaPipeline = null;

      this.started = false;
      this.disposed = true;
    } catch (Exception ex) {
      log.error("Failed to dispose live session '{}'.", this.id);
    }*/
  }

  /*
   * Utils
   */

  private void releaseResources() {

    if (this.mediaPipeline != null) {
      this.mediaPipeline.release();
    }

    if (this.webRtcEndpoint != null) {
      this.webRtcEndpoint.release();
    }

    if (this.recorderEndpoint != null) {
      this.recorderEndpoint.release();
    }
  }

  private void triggerActivity() {
    this.lastActive = new Date();
  }

}
