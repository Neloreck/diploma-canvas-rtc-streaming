package com.xcore.application;

import lombok.extern.log4j.Log4j2;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Log4j2
public class XCoreApplication {

	public static void main(String[] args) {
	  log.info("Application started.");
		SpringApplication.run(XCoreApplication.class, args);
	}
}
