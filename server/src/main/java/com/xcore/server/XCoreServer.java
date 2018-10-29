package com.xcore.server;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = { "com.xcore.server", "com.xcore.application"})
// Utility:
@Slf4j(topic = "[✴️ Application]")
public class XCoreServer {

	public static void main(String[] args) {
		log.info("X-Core application starting.");
		SpringApplication.run(XCoreServer.class, args);
	}

}
