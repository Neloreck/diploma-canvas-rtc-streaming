package com.xcore.server;

import com.xcore.server.initialization.ApplicationInitializer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.annotation.PostConstruct;

@EnableScheduling
@SpringBootApplication

@Slf4j(topic = "[✴️ Application]")
@EntityScan(basePackages = { "com.xcore" })
public class XCoreServer {

	/*
	 * Startup Spring server application.
	 */

	static {
		log.info("=========================================");
		log.info("= = =  X-Core application resolved. = = =");
		log.info("=========================================");
	}

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
		applicationInitializer.proceed();
	}

}
