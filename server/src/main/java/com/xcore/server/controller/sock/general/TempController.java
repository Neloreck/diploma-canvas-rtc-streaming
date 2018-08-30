package com.xcore.server.controller.sock.general;

import com.xcore.server.controller.sock.general.api.TempMessageRequest;
import com.xcore.server.controller.sock.general.api.TempMessageResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Slf4j(topic = "[TempCtrl]")
@Controller
public class TempController {

  @MessageMapping("/temp/request")
  @SendTo("/cl/temp/response")
  public TempMessageResponse tempMessageHandle(TempMessageRequest tempMessageRequest) throws InterruptedException {
    log.info("Got temp request", tempMessageRequest);

    Thread.sleep(1000);

    var response = new TempMessageResponse();

    return response;
  }

  @SubscribeMapping("/tempSubscribe")
  public void tempSubscription(Principal principal) {
    String userName = principal.getName();

    log.info("User subscribed to channel: {}.", principal);
  }


  @Scheduled(fixedDelay = 5000)
  public void pingConnections() {

  }

}
