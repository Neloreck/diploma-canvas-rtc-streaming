package com.xcore.application.modules.live.models.sessions;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.xcore.application.modules.live.exceptions.session.*;
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

  private MediaProfileSpecType fileSpec;
  private String filePath;

  /*
   * Metadata.
   */

  private Boolean initialized = false;
  private Boolean released = false;
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
   * ICE:
   */

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

  // 1) Initialize session.
  public void initialize(final MediaPipeline mediaPipeline, final LiveMessagingService liveMessagingService,
                         final MediaProfileSpecType mediaProfileSpecType, final String filePath
  ) throws SessionAlreadyInitializedException, SessionDisposedException {

    this.triggerActivity();

    if (this.initialized) {
      throw new SessionAlreadyInitializedException();
    } else if (this.disposed) {
      throw new SessionDisposedException();
    } else {

      log.info("[{}] Initializing.", id);

      this.filePath = filePath;
      this.fileSpec = mediaProfileSpecType;
      this.mediaPipeline = mediaPipeline;

      this.allocateEndpoints();
      this.configureBandwidth();

      this.initializeBaseEventsListeners(liveMessagingService);
      this.initializeWebRtcEventsListeners(liveMessagingService);
      this.initializeWebRtcRecorderEventsListeners(liveMessagingService);

      this.initialized = true;
    }
  }

  // 2) Exchange offer.
  public String proceedSDPOffer(final String sdpOffer) throws SessionNotInitializedException, SessionAlreadyStartedException {

    log.info("[{}] Processing offer.", id);

    this.triggerActivity();

    if (!this.initialized) {
      throw new SessionNotInitializedException();
    } else if (this.started) {
      throw new SessionAlreadyStartedException();
    } else {

      String sdpAnswer = this.webRtcEndpoint.processOffer(sdpOffer);

      this.webRtcEndpoint.gatherCandidates();
      this.started = true;

      return sdpAnswer;
    }
  }

  // 3) Finish exchange.
  public void finishExchange() {

    log.info("[{}] Exchange finished.", this.id);

    this.triggerActivity();
    this.exchanged = true;
  }

  // 4) Start record.
  public void startRecord() throws SessionRecordedException, SessionDisposedException, SessionNotInitializedException, SessionNotStartedException, SessionAlreadyRecordingException {

    this.triggerActivity();

    if (!this.initialized) {
      throw new SessionNotInitializedException();
    } else if (this.disposed) {
      throw new SessionDisposedException();
    } else if (this.recorded) {
      throw new SessionRecordedException();
    } else if (this.recording) {
      throw new SessionAlreadyRecordingException();
    } else if (!this.started) {
      throw new SessionNotStartedException();
    } else {

      log.info("[{}] Start record.", this.id);

      this.recording = true;

      this.webRtcEndpoint.connect(recorderEndpoint, MediaType.VIDEO);
      this.webRtcEndpoint.connect(recorderEndpoint, MediaType.AUDIO);

      this.recorderEndpoint.record();
    }
  }

  // 5) Stop record.
  public void stopRecord() throws SessionDisposedException, SessionNotStartedException, SessionRecordedException, SessionNotInitializedException {

    this.triggerActivity();

    if (this.recorded) {
      throw new SessionRecordedException();
    } else if (!this.initialized) {
      throw new SessionNotInitializedException();
    } else if (!this.started || !this.recording) {
      throw new SessionNotStartedException();
    } else if (this.disposed) {
      throw new SessionDisposedException();
    } else {

      log.info("[{}] Stop record. File: '{}'.", this.id, this.filePath);

      this.recorderEndpoint.stop();
      this.webRtcEndpoint.disconnect(this.recorderEndpoint);
    }
  }

  // 6) Close.
  public void close() throws SessionNotInitializedException, SessionNotStartedException, SessionDisposedException, SessionRecordedException {

    log.info("[{}] Close.", id);

    this.triggerActivity();

    if (!this.initialized) {
      throw new SessionNotInitializedException();
    } else if (!this.started) {
      throw new SessionNotStartedException();
    } else if (this.disposed) {
      throw new SessionDisposedException();
    } else {

      if (this.recording) {
        this.stopRecord();
      }

      this.started = false;
    }
  }

  // Initialization:

  private void allocateEndpoints() {

    this.webRtcEndpoint = new WebRtcEndpoint.Builder(mediaPipeline).recvonly().build();
    this.recorderEndpoint = new RecorderEndpoint
        .Builder(mediaPipeline, filePath)
        .stopOnEndOfStream()
        .withMediaProfile(this.fileSpec)
        .build();

    this.mediaPipeline.setName("RTC_PIPELINE_ENDPOINT-" + id + "." + ownerId);
    this.webRtcEndpoint.setName("RTC_CONNECTION_ENDPOINT-" + id + "." + ownerId);
    this.recorderEndpoint.setName("RTC_RECORDER_ENDPOINT-" + id + "." + ownerId);
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

    this.webRtcEndpoint.addConnectionStateChangedListener(event -> this.setState(event.getNewState()));
    this.webRtcEndpoint.addErrorListener(event -> liveMessagingService.sendError(this.messagingRoom, event.getDescription()));
    this.webRtcEndpoint.addElementConnectedListener(event -> {});
    this.webRtcEndpoint.addElementDisconnectedListener(event -> {});
    this.webRtcEndpoint.addMediaStateChangedListener(event -> {});
    this.webRtcEndpoint.addMediaSessionStartedListener(event -> {});
    this.webRtcEndpoint.addMediaSessionTerminatedListener(event -> {});
    this.webRtcEndpoint.addMediaFlowInStateChangeListener(event -> {});
    this.webRtcEndpoint.addMediaFlowInStateChangeListener(event -> {});
    this.webRtcEndpoint.addMediaFlowOutStateChangeListener(event -> {});
    this.webRtcEndpoint.addMediaStateChangedListener(event -> {});
    this.webRtcEndpoint.addMediaTranscodingStateChangeListener(event -> {});
  }

  private void initializeWebRtcEventsListeners(final LiveMessagingService liveMessagingService) {

    this.webRtcEndpoint.addIceCandidateFoundListener(event -> liveMessagingService.sendIceCandidate(this.messagingRoom, event.getCandidate()));
    this.webRtcEndpoint.addIceComponentStateChangeListener(event -> {});
    this.webRtcEndpoint.addIceGatheringDoneListener(event -> {});
    this.webRtcEndpoint.addNewCandidatePairSelectedListener(event -> {});
  }

  private void initializeWebRtcRecorderEventsListeners(final LiveMessagingService liveMessagingService) {

    this.recorderEndpoint.addPausedListener(event -> {});
    this.recorderEndpoint.addRecordingListener(event -> {});
    this.recorderEndpoint.addStoppedListener(event -> {
      this.recording = false;
      this.recorded = true;
    });

    this.recorderEndpoint.addMediaFlowInStateChangeListener(event -> {});
    this.recorderEndpoint.addMediaFlowOutStateChangeListener(event -> {});
    this.recorderEndpoint.addMediaTranscodingStateChangeListener(event -> {});
    this.recorderEndpoint.addElementDisconnectedListener(event -> {});
    this.recorderEndpoint.addElementConnectedListener(event -> {});
    this.recorderEndpoint.addElementDisconnectedListener(event -> {});
    this.recorderEndpoint.addErrorListener(event -> {});
  }

  /*
   * Dispose.
   */

  public void dispose() throws SessionDisposedException {

    if (this.disposed) {
      throw new SessionDisposedException();
    } else {

      log.info("[{}] Disposing.", this.id);

      if (!this.released) {
        this.releaseResources();
      }

      this.webRtcEndpoint = null;
      this.recorderEndpoint = null;
      this.mediaPipeline = null;

      this.disposed = true;
    }
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

    this.released = true;
  }

  private void triggerActivity() {
    this.lastActive = new Date();
  }

}
