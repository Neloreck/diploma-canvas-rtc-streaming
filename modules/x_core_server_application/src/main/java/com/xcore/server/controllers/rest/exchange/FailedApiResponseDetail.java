package com.xcore.server.controllers.rest.exchange;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FailedApiResponseDetail {

  private String type = "Error";
  private String message;

}
