package com.xcore.application.modules.authentication.utils

object AuthenticationDataValidator {

  val MIN_PASSWORD_LENGTH: Int = 4;
  val MAX_PASSWORD_LENGTH: Int = 64;

  val MIN_USERNAME_LENGTH: Int = 4;
  val MAX_USERNAME_LENGTH: Int = 64;

  def isValidPassword(password: String): Boolean =
    password.length >= MIN_PASSWORD_LENGTH && password.length <= MAX_PASSWORD_LENGTH;

  def isValidUsername(username: String): Boolean =
    username.length >= MIN_USERNAME_LENGTH && username.length <= MAX_USERNAME_LENGTH;

  def isValidEmail(email: String): Boolean =
    if ("""(?=[^\s]+)(?=(\w+)@([\w\.]+))""".r.findFirstIn(email).isEmpty) false else true

}
