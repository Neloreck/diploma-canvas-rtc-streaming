package com.xcore.server.controllers.sock.general.api;

import lombok.Data;

@Data
public class TempMessageRequest extends SockMessage {

  private final String temp = "temp";

}
