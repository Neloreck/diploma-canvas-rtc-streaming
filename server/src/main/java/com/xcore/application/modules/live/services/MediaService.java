package com.xcore.application.modules.live.services;

import com.xcore.application.modules.live.models.LiveSession;
import com.xcore.application.modules.live.models.messages.LiveSdpMessage;
import com.xcore.application.modules.live.models.messages.LiveWebSocketMessage;
import lombok.extern.slf4j.Slf4j;
import org.kurento.client.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j(topic = "[MEDIA SERVICE]")
public class MediaService {

  @Autowired
  private KurentoClient kurentoClient;

  @Autowired
  private LiveService liveService;

  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;

  /*
   * Add ICE candidate for related session.
   */
  public void processIceCandidate(final String room, final String sessionId, final IceCandidate iceCandidate) {

    final LiveSession liveSession = liveService.getSession(sessionId);
    final WebRtcEndpoint webRtcEndpoint = liveSession.getWebRtcEndpoint();

    webRtcEndpoint.addIceCandidate(iceCandidate);
  }

  /*
   * Processing related SDP offer for session.
   */
  public void processSdpOffer(final String room, String sessionId,  String sdpOffer) {

    final LiveSession liveSession = liveService.getSession(sessionId);
    final MediaPipeline pipeline = kurentoClient.createMediaPipeline();
    final WebRtcEndpoint webRtcEndpoint = new WebRtcEndpoint.Builder(pipeline).build();

    liveSession.setMediaPipeline(pipeline);
    liveSession.setWebRtcEndpoint(webRtcEndpoint);

    webRtcEndpoint.connect(webRtcEndpoint);

    initWebRtcEndpoint(room, sessionId, webRtcEndpoint, sdpOffer);
    startWebRtcEndpoint(webRtcEndpoint);
  }

  /*
   * Handle stop for session.
   */
  public void processStop(final String room, String sessionId) {

    final LiveSession liveSession = liveService.getSession(sessionId);
    final MediaPipeline mediaPipeline = liveSession.getMediaPipeline();

    if (mediaPipeline != null) {
      mediaPipeline.release();
    }
  }

  /*
   * Stop, if got any error.
   */
  public void processError(final String room, final String sessionId, final LiveWebSocketMessage webSocketMessage) {

    log.error("Got live error: {}", webSocketMessage);

    this.processStop(room, sessionId);
  }

  /*
   * Private implementation.
   */

  private void initWebRtcEndpoint(final String room, final String sessionId, final WebRtcEndpoint webRtcEndpoint, final String sdpOffer) {

    initBaseEventListeners(room, sessionId, webRtcEndpoint, "WebRtcEndpoint");
    initWebRtcEventListeners(sessionId, webRtcEndpoint);

    webRtcEndpoint.setName("WEBRTC-" + sessionId + "-LIVE-SESSION");

    final String sdpAnswer = webRtcEndpoint.processOffer(sdpOffer);

    // Generate answer.

    LiveWebSocketMessage<LiveSdpMessage> message = new LiveWebSocketMessage<>();

    message.setType("SDP_ANSWER");
    message.setBody(new LiveSdpMessage(sdpAnswer));

    simpMessagingTemplate.convertAndSend("/topic/live." + room + ".sdpAnswer", message);
  }

  private void startWebRtcEndpoint(WebRtcEndpoint webRtcEp) {
    webRtcEp.gatherCandidates();
  }

  // Listeners.

  private void initBaseEventListeners(final String room, final String sessionId, final BaseRtpEndpoint baseRtpEndpoint, String className) {

    // Event: Error.
    /* todo: sendError(session, "[Kurento] " + event.getDescription()); */
    baseRtpEndpoint.addErrorListener(event -> this.processStop(room, sessionId));

    // Event: Media is flowing into this sink.
    baseRtpEndpoint.addMediaFlowInStateChangeListener(event -> log.info("Event: Media is flowing into this sink."));

    // Event: Media is flowing out of this source.
    baseRtpEndpoint.addMediaFlowOutStateChangeListener(event -> log.info("Event: Media is flowing out of this source."));

    // Event: Connection state changed.
    baseRtpEndpoint.addConnectionStateChangedListener(event -> log.info("Event: Connection state changed."));

    // Event: Media state changed.
    baseRtpEndpoint.addMediaStateChangedListener(event -> log.info("Event: Media state changed."));

    // Event: This element will (or will not) perform media transcoding.
    baseRtpEndpoint.addMediaTranscodingStateChangeListener(event -> log.info("Media transcoding state changed."));
  }

  private void initWebRtcEventListeners(final String sessionId, final WebRtcEndpoint webRtcEndpoint) {

    // Event: The ICE backend found a local candidate during Trickle ICE.
    /*
      todo:
      JsonObject message = new JsonObject();
      message.addProperty("id", "ADD_ICE_CANDIDATE");
      message.add("candidate", JsonUtils.toJsonObject(event.getCandidate()));
      sendMessage(session, message.toString());
    */
    webRtcEndpoint.addIceCandidateFoundListener(event -> log.info("WebRtcEndpoint: ICE candidate found."));

    // Event: The ICE backend changed state.
    webRtcEndpoint.addIceComponentStateChangeListener(event -> log.info("WebRtcEndpoint: ICE component state changed."));

    // Event: The ICE backend finished gathering ICE candidates.
    webRtcEndpoint.addIceGatheringDoneListener(event -> log.info("WebRtcEndpoint: ICE gathering done."));

    // Event: The ICE backend selected a new pair of ICE candidates for use
    webRtcEndpoint.addNewCandidatePairSelectedListener(event -> log.info("WebRtcEndpoint: ICE candidate pair selected."));
  }

}
