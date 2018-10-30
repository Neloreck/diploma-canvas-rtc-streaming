package com.xcore.server.controllers.rest.exchange;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
class ErrorApiResponseDetail {

  private String type = "Error";
  private String message;

}
