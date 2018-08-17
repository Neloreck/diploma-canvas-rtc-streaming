package com.xcore.server.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EntityScan("com.xcore")
@EnableJpaRepositories("com.xcore")
public class DataSourceConfig {
}
