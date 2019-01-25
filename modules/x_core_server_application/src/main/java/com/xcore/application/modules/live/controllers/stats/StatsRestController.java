package com.xcore.application.modules.live.controllers.stats;

import com.xcore.application.modules.authentication.utils.AuthenticationUtils;
import com.xcore.application.modules.live.controllers.stats.exchange.ActiveEventResponse;
import com.xcore.application.modules.live.models.events.LiveEvent;
import com.xcore.application.modules.live.services.LiveEventService;
import com.xcore.server.controllers.rest.exchange.ApiResponse;
import com.xcore.server.controllers.rest.exchange.FailedApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/live/stats")
@Slf4j(topic = "[LIVE EVENT CONTROLLER]")
public class StatsRestController {

  @Autowired
  private LiveEventService liveEventService;

  /*
   * Methods.
   */

  @GetMapping("/user/activeEvent")
  public ApiResponse getActiveLiveEvent() {

    try {

      final LiveEvent optionalLiveEvent = liveEventService.getUserActiveEvent(AuthenticationUtils.getAuthorizedUser());

      return new ActiveEventResponse(optionalLiveEvent);
    } catch (Exception ex) {
      return new FailedApiResponse(ex);
    }
  }

}
