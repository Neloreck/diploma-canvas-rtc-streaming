package com.xcore.application.authentication.models.user;

import org.springframework.data.repository.CrudRepository;

public interface IUserRepository extends CrudRepository<AppUser, Long>
{
}
