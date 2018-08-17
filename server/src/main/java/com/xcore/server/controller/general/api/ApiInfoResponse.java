package com.xcore.server.controller.general.api;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ApiInfoResponse extends Response {

  private String version = "1.0";
  private String name = "x-core-api";

  @JsonSerialize
  private Boolean isPrivate() {
    return true;
  }

}
