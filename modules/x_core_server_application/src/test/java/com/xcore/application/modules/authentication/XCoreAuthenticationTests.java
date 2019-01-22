package com.xcore.application.modules.authentication;

import com.xcore.server.XCoreServer;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {XCoreServer.class})
@WebAppConfiguration
@ActiveProfiles(profiles = {"testing"})
public class XCoreAuthenticationTests {

	@Test
	public void contextLoads() {
	}

}
