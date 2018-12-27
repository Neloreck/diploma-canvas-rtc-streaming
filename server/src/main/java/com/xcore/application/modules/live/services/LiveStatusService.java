package com.xcore.application.modules.live.services;

import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class LiveStatusService {

  private Set<String> connectedUsers = new HashSet<>();
  private Long count = 0L;

}
