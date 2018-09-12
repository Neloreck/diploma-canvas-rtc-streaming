package com.xcore.server.controllers.sock.general.api;

import lombok.Data;

@Data
public class TempMessageResponse extends SockMessage {

  private final String temp = "temp";

}
