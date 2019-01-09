package com.xcore.application.modules.live.controllers.events.exchange;

import com.xcore.application.modules.live.models.events.LiveEvent;
import com.xcore.server.controllers.rest.exchange.ApiResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
public class LiveEventResponse extends ApiResponse {

  private LiveEvent liveEvent;

}
