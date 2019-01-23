package com.xcore.application.modules.live.configs;

import lombok.Data;
import org.kurento.client.KurentoClient;
import org.kurento.client.MediaProfileSpecType;
import org.kurento.client.Properties;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
public class LiveMediaConfig {

  @Value("${kurento.connection.host}")
  private String kurentoHost;

  @Value("${kurento.connection.port}")
  private Long kurentoPort;

  @Value("${kurento.connection.endpoint}")
  private String kurentoEndpoint;

  private MediaProfileSpecType videoSaveFormat = MediaProfileSpecType.WEBM;

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
