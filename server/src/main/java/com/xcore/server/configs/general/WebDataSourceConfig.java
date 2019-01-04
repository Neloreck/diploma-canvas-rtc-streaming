package com.xcore.server.configs.general;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EntityScan("com.xcore.application")
@EnableJpaRepositories("com.xcore.application")
public class WebDataSourceConfig {
}
