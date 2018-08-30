package com.xcore.server.controller.sock.general.api;

import lombok.Data;

@Data
public class TempMessageResponse extends SockMessage {

  private final String temp = "temp";

}
