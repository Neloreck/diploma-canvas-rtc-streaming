package com.xcore.server.controller.sock.general.api;

import lombok.Data;

@Data
public class TempMessageRequest extends SockMessage {

  private final String temp = "temp";

}
