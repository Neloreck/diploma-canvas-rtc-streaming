package com.xcore.application.modules.authentication.exceptions

class UserNotFoundException() extends Exception {

  override def getMessage: String = "Requested user was not found.";

}
