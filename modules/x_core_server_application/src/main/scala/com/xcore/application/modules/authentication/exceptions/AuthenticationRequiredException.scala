package com.xcore.application.modules.authentication.exceptions

class AuthenticationRequiredException() extends Exception {

  override def getMessage: String = "Correct authentication required.";

}
