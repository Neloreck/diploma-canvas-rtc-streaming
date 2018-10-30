package com.xcore.server.controllers.socket.exchange;

import lombok.Data;

@Data
public class TempMessageRequest extends SockMessage {

  private final String temp = "temp";

}
