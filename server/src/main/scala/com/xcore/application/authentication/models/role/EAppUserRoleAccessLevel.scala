package com.xcore.application.authentication.models.role

object EAppUserRoleAccessLevel extends Enumeration {
  type ERoleAccessLevel = Value;
  val FROZEN, DEFAULT, MODERATOR, ADMIN = Value;
}
