package com.xcore.application.modules.live.models.events;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class LiveEventGraphicsObject {

  private String position;
  private String config;
  private String className;

}
