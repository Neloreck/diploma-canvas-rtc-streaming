package com.xcore.application.modules.live.controllers.events;

import com.xcore.application.modules.authentication.exceptions.UserNotFoundException;
import com.xcore.application.modules.authentication.models.user.ApplicationUser;
import com.xcore.application.modules.authentication.utils.AuthenticationUtils;
import com.xcore.application.modules.live.controllers.events.exchange.*;
import com.xcore.application.modules.live.exceptions.event.EventNotBelongException;
import com.xcore.application.modules.live.exceptions.event.EventNotFoundException;
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

@RestController()
@RequestMapping("/api/live/events")
@Slf4j(topic = "[LIVE EVENT CONTROLLER]")
public class LiveEventRestController {

  @Autowired()
  private LiveEventService liveEventService;

  @Autowired()
  private LiveBookmarkService liveBookmarkService;

  /*
   * Methods.
   */

  @PostMapping()
  public ApiResponse createLiveEvent(@RequestBody final LiveEventCreateRequest request) {

    final ApplicationUser applicationUser = AuthenticationUtils.getAuthorizedUser();
    final Long ownerId = applicationUser.getId();

    try {

      if (liveEventService.getUserActiveEvent(applicationUser) != null) {
        return new FailedApiResponse("Failed to create new event. User already has active one.");
      }

      final LiveEvent liveEvent = liveEventService.createLiveEvent(
        ownerId, request.getName(), request.getDescription(), request.getSecured(), request.getSecuredKey()
      );

      log.info("User '{}' created live event, id: '{}'.", ownerId, liveEvent.getId());

      return new LiveEventCreateResponse(ownerId, liveEvent);
  } catch (UserNotFoundException ex) {

      return new FailedApiResponse(ex);
    }
  }

  @GetMapping("/{eventId}")
  public ApiResponse getLiveEvent(@PathVariable final UUID eventId) {

    try {

      final LiveEvent liveEvent = liveEventService.getLiveEventById(eventId);

      EventSecurityUtils.checkIfEventBelongsOrThrow(liveEvent);

      return new LiveEventResponse(liveEvent);

    } catch (EventNotFoundException | EventNotBelongException ex) {
      return new FailedApiResponse(ex);
    }
  }

  @GetMapping("/{eventId}/bookmarks")
  public ApiResponse getLiveEventBookmarks(@PathVariable UUID eventId) {

    try {

      EventSecurityUtils.checkIfEventBelongsOrThrow(liveEventService.getLiveEventById(eventId));

      final Set<LiveEventLayoutBookmark> bookmarks = liveBookmarkService.getLiveEventBookmarks(eventId);

      return new LiveEventBookmarksResponse(eventId, bookmarks);

    } catch (Exception ex) {
      return new FailedApiResponse(ex);
    }
  }

  @PostMapping("/{eventId}/bookmarks")
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
