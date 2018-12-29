package com.xcore.application.modules.live.models;

import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.kurento.client.MediaPipeline;
import org.kurento.client.WebRtcEndpoint;

import java.util.Date;

@Data
@Slf4j(topic = "[LIVE SESSION]")
public class LiveSession {

  private final String id;
  private final Long ownerId;

  private final Date created = new Date();
  private Date lastActive = new Date();

  private Boolean disposed = false;

  private MediaPipeline mediaPipeline = null;
  private WebRtcEndpoint webRtcEndpoint = null;

  public LiveSession(String id, Long ownerId) {
    this.id = id;
    this.ownerId = ownerId;
  }


  public void dispose() {

    if (this.disposed) {
      return;
    }

    log.info("Disposing live session: '{}'.", this.id);

    if (this.webRtcEndpoint != null) {
      this.webRtcEndpoint = null;
    }

    if (this.mediaPipeline != null) {
      this.mediaPipeline.release();
      this.mediaPipeline = null;
    }

    this.disposed = true;
  }

}
