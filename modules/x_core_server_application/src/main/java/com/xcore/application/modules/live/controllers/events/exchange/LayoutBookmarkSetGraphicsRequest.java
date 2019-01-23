package com.xcore.application.modules.live.controllers.events.exchange;

import com.xcore.application.modules.live.models.events.LiveEventGraphicsObject;
import com.xcore.server.controllers.rest.exchange.ApiResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LayoutBookmarkSetGraphicsRequest extends ApiResponse {

  private List<LiveEventGraphicsObject> objects;

}
