package com.xcore.application.authentication.models.user;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

trait IAppUserRepository extends CrudRepository[AppUser, Long] {

  def findByUsername(username: String): Optional[AppUser];

  def findByMail(mail: String): Optional[AppUser];

}
