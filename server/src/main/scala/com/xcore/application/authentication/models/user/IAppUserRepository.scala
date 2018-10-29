package com.xcore.application.authentication.models.user;

import org.springframework.data.repository.CrudRepository;

trait IAppUserRepository extends CrudRepository[AppUser, Long] {
}
