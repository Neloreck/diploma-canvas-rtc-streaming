package com.xcore.server;

import com.xcore.application.initialization.ApplicationInitializer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.annotation.PostConstruct;

@SpringBootApplication
@EntityScan(basePackages = { "com.xcore.server", "com.xcore.application"})
@Slf4j(topic = "[✴️ Application]")
public class XCoreServer {

	static { log.info("X-Core application starting."); }

	public static void main(String[] args) {
		SpringApplication.run(XCoreServer.class, args);
	}

	/*
	 * Initialize spring application, if this process is needed.
	 */

	@Autowired
	private ApplicationInitializer applicationInitializer;

	@PostConstruct
	public void postConstruct() {
		applicationInitializer.initialize();
	}

}
