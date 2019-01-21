package com.xcore.application.modules.live.controllers.events.exchange;

import com.xcore.application.modules.live.models.events.LiveEventLayoutBookmark;
import com.xcore.server.controllers.rest.exchange.ApiResponse;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
public class LiveEventBookmarkResponse extends ApiResponse {

  private UUID liveEventId;
  private LiveEventLayoutBookmark bookmark;

}
