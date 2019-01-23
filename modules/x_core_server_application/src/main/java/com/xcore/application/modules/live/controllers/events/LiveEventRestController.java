package com.xcore.application.modules.live.controllers.events;

import com.xcore.application.modules.authentication.exceptions.UserNotFoundException;
import com.xcore.application.modules.authentication.utils.AuthenticationUtils;
import com.xcore.application.modules.live.controllers.events.exchange.LiveEventCreateRequest;
import com.xcore.application.modules.live.controllers.events.exchange.LiveEventCreateResponse;
import com.xcore.application.modules.live.controllers.events.exchange.LiveEventResponse;
import com.xcore.application.modules.live.exceptions.event.EventNotBelongException;
import com.xcore.application.modules.live.exceptions.event.EventNotFoundException;
import com.xcore.application.modules.live.models.events.LiveEvent;
import com.xcore.application.modules.live.services.LiveEventService;
import com.xcore.application.modules.live.utils.EventSecurityUtils;
import com.xcore.server.controllers.rest.exchange.ApiResponse;
import com.xcore.server.controllers.rest.exchange.FailedApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/live/events")
@Slf4j(topic = "[LIVE EVENT CONTROLLER]")
public class LiveEventRestController {

  @Autowired
  private LiveEventService liveEventService;

  /*
   * Methods.
   */

  @PostMapping()
  public ApiResponse createLiveEvent(@RequestBody final LiveEventCreateRequest request) {

    final Long ownerId = AuthenticationUtils.getAuthorizedUserId();

    try {

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
  public ApiResponse getLiveEvent(@PathVariable UUID eventId) {

    try {
      final LiveEvent liveEvent = liveEventService.getLiveEventById(eventId);

      EventSecurityUtils.checkIfEventBelongsOrThrow(liveEvent);

      return new LiveEventResponse(liveEvent);
    } catch (EventNotFoundException | EventNotBelongException ex) {
      return new FailedApiResponse(ex);
    }
  }

}
