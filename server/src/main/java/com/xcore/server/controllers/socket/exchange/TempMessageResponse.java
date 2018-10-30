package com.xcore.server.controllers.socket.exchange;

import lombok.Data;

@Data
public class TempMessageResponse extends SockMessage {

  private final String temp = "temp";

}
