package com.xcore.server.controllers.socket.exchange;

import lombok.Data;

@Data
public class SockMessage {

  private final String type = this.getClass().getName();

}
