package com.xcore.application.modules.live.controllers.events.exchange;

import com.xcore.server.controllers.rest.exchange.ApiResponse;
import lombok.Data;

@Data
public class LiveEventCreateRequest extends ApiResponse {

  private String name;
  private String description;
  private Boolean secured;
  private String securedKey;

}
