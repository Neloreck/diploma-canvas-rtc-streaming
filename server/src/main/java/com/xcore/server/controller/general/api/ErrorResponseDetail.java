package com.xcore.server.controller.general.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponseDetail {

  private String type = "Error";
  private String message;

}
