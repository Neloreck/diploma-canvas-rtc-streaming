package com.xcore.application.authentication.models.role;

import org.springframework.data.repository.CrudRepository;

trait IAppUserRoleRepository extends CrudRepository[AppUserRole, Long] {

  def findByAccessLevel(appUserRoleAccessLevel: EAppUserRoleAccessLevel): AppUserRole;

}
