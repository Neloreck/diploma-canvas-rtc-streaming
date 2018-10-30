package com.xcore.application.authentication.services.auth

import javax.annotation.Resource
import org.springframework.stereotype.Service;

@Service
@Resource(name = "XCoreAuthService")
class XCoreAuthService extends IAuthService {

  override def isAuthorized(login: String, password: String): Boolean = {
    false;
  }

  override def login(): Boolean = {
    false;
  };

  override def logout(): Boolean = {
    false;
  };

}
