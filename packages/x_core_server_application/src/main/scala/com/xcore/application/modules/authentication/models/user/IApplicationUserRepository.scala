package com.xcore.application.modules.authentication.models.user;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

trait IApplicationUserRepository extends CrudRepository[ApplicationUser, Long] {

  def findByUsername(username: String): Optional[ApplicationUser];

  def findByMail(mail: String): Optional[ApplicationUser];

}
