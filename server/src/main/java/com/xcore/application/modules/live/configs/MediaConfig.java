package com.xcore.application.modules.live.configs;

import org.kurento.client.KurentoClient;
import org.kurento.client.Properties;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MediaConfig {

  @Value("${kurento.host}")
  private String kurentoHost;

  @Value("${kurento.port}")
  private Long kurentoPort;

  @Value("${kurento.endpoint}")
  private String kurentoEndpoint;

  @Bean
  public KurentoClient kurentoClient() {
    return KurentoClient.create(
        "ws://" + kurentoHost + ":" + kurentoPort + "/" + kurentoEndpoint,
        getKurentoConfig()
    );
  }

  private Properties getKurentoConfig() {

    final Properties configuration = new Properties();

    configuration.add("1", "1");

    return configuration;
  }

}
