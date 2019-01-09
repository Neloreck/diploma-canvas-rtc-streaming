package com.xcore.application.modules.live.controllers.events;

import com.xcore.application.modules.authentication.exceptions.AuthenticationRequiredException;
import com.xcore.application.modules.authentication.exceptions.UserNotFoundException;
import com.xcore.application.modules.authentication.utils.AuthenticationUtils;
import com.xcore.application.modules.live.controllers.events.exchange.EventCreateRequest;
import com.xcore.application.modules.live.controllers.events.exchange.EventCreateResponse;
import com.xcore.application.modules.live.controllers.events.exchange.LiveEventResponse;
import com.xcore.application.modules.live.exceptions.EventNotFoundException;
import com.xcore.application.modules.live.models.events.LiveEvent;
import com.xcore.application.modules.live.services.LiveEventService;
import com.xcore.server.controllers.rest.exchange.ApiResponse;
import com.xcore.server.controllers.rest.exchange.FailedApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/live/event")
@Slf4j(topic = "[LIVE EVENT CONTROLLER]")
public class LiveEventRestController {

  @Autowired
  private LiveEventService liveEventService;

  @PostMapping()
  public ApiResponse createLiveEvent(@RequestBody final EventCreateRequest request) {

    final Long ownerId = AuthenticationUtils.getAuthorizedUserId();

    try {

      final LiveEvent liveEvent = liveEventService.createLiveEvent(
          ownerId, request.getName(), request.getDescription(), request.getSecured(), request.getSecuredKey()
      );

      log.info("User '{}' created live event, id: '{}'.", ownerId, liveEvent.getId());

      return new EventCreateResponse(ownerId, liveEvent);
    } catch (UserNotFoundException ex) {
      return new FailedApiResponse(ex);
    }
  }

  @GetMapping("/{eventId}")
  public ApiResponse getLiveEvent(@PathVariable String eventId) {

    try {

      final LiveEvent liveEvent = liveEventService.getLiveEventById(eventId);
      final Long eventOwnerId = liveEvent.getOwner().getId();

      if (eventOwnerId == AuthenticationUtils.getAuthorizedUserId()) {
        return new LiveEventResponse(liveEvent);
      } else {
        throw new AuthenticationRequiredException();
      }

    } catch (EventNotFoundException | AuthenticationRequiredException ex) {
      return new FailedApiResponse(ex);
    }
  }

}
