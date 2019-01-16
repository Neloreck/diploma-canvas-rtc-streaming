package com.xcore.application.modules.live.controllers.events.exchange;

import com.xcore.server.controllers.rest.exchange.ApiRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LiveEventBookmarkCreateRequest extends ApiRequest {

  private String name;

}
