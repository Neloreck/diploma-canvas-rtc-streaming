package com.xcore.application.media.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api")
public class MediaController {


  @GetMapping("/test")
  public void test() {
    log.info("GOT TEST REQUEST");
  }

}
