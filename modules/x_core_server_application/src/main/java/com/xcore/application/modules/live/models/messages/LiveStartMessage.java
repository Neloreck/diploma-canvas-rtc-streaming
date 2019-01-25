package com.xcore.application.modules.live.models.messages;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class LiveStartMessage {

  private UUID eventId;

}
