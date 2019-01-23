package com.xcore.application.modules.live.controllers.events.exchange;

import com.xcore.application.modules.live.models.events.LiveEventGraphicsObject;
import com.xcore.server.controllers.rest.exchange.ApiResponse;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
public class LayoutBookmarkGraphicsResponse extends ApiResponse {

  private UUID liveEventId;
  private Long bookmarkId;

  private List<LiveEventGraphicsObject> objects;

}
