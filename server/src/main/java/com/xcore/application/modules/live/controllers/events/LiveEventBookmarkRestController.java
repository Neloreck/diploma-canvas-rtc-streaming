package com.xcore.application.modules.live.controllers.events;

import com.xcore.application.modules.live.controllers.events.exchange.LiveEventBookmarkCreateRequest;
import com.xcore.application.modules.live.controllers.events.exchange.LiveEventBookmarkResponse;
import com.xcore.application.modules.live.controllers.events.exchange.LiveEventBookmarksResponse;
import com.xcore.application.modules.live.models.events.LiveEvent;
import com.xcore.application.modules.live.models.events.LiveEventLayoutBookmark;
import com.xcore.application.modules.live.services.LiveBookmarkService;
import com.xcore.application.modules.live.services.LiveEventService;
import com.xcore.application.modules.live.utils.EventSecurityUtils;
import com.xcore.server.controllers.rest.exchange.ApiResponse;
import com.xcore.server.controllers.rest.exchange.FailedApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/live/events/{eventId}/bookmarks")
@Slf4j(topic = "[LIVE EVENT CONTROLLER]")
public class LiveEventBookmarkRestController {

  @Autowired
  private LiveEventService liveEventService;

  @Autowired
  private LiveBookmarkService liveBookmarkService;

  @GetMapping()
  public ApiResponse getLiveEventBookmarks(@PathVariable UUID eventId) {

    try {
      EventSecurityUtils.checkIfEventBelongsOrThrow(liveEventService.getLiveEventById(eventId));
      final Set<LiveEventLayoutBookmark> bookmarks = liveBookmarkService.getLiveEventBookmarks(eventId);

      return new LiveEventBookmarksResponse(eventId, bookmarks);
    } catch (Exception ex) {
      return new FailedApiResponse(ex);
    }
  }

  @PostMapping()
  public ApiResponse createLiveEventBookmark(@PathVariable UUID eventId, @RequestBody LiveEventBookmarkCreateRequest request) {

    try {

      final LiveEvent liveEvent = liveEventService.getLiveEventById(eventId);

      EventSecurityUtils.checkIfEventBelongsOrThrow(liveEvent);

      final LiveEventLayoutBookmark layoutBookmark = liveBookmarkService.createBookmark(liveEvent, request.getName());

      return new LiveEventBookmarkResponse(eventId, layoutBookmark);
    } catch (Exception ex) {
      return new FailedApiResponse(ex);
    }
  }

}
