package com.xcore.server.controllers.sock.general.api;

import lombok.Data;

@Data
public class SockMessage {

  private final String type = this.getClass().getName();

}
