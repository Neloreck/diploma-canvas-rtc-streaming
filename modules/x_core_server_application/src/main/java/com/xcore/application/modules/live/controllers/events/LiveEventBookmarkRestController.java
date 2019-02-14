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

}
