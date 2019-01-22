package com.xcore.application.modules.live.models.messages;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class LiveWebSocketMessage<T extends Object> {

  private String type = "CUSTOM";
  private T body;

}
