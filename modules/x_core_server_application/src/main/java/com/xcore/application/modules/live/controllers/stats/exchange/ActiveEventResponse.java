package com.xcore.application.modules.live.controllers.stats.exchange;

import com.xcore.application.modules.live.models.events.LiveEvent;
import com.xcore.server.controllers.rest.exchange.ApiResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.lang.Nullable;

@Data
@AllArgsConstructor
public class ActiveEventResponse extends ApiResponse {

  @Nullable
  private LiveEvent liveEvent;

}
