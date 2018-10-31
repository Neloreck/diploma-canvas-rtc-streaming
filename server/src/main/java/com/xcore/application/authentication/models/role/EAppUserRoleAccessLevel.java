package com.xcore.application.authentication.models.role;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public enum EAppUserRoleAccessLevel {

  ROLE_FROZEN("ROLE_FROZEN"), ROLE_USER("ROLE_USER"), ROLE_MODERATOR("ROLE_MODERATOR"), ROLE_ADMIN("ROLE_ADMIN");

  private final String name;

  EAppUserRoleAccessLevel(String name) {
    this.name = name;
  }

  public List<GrantedAuthority> getAuthorities() {

    switch (this) {

      case ROLE_FROZEN:
        return Collections.singletonList(new SimpleGrantedAuthority(ROLE_FROZEN.name));

      case ROLE_USER:
        return Collections.singletonList(new SimpleGrantedAuthority(ROLE_USER.name));

      case ROLE_MODERATOR:
        return Arrays.asList(new SimpleGrantedAuthority(ROLE_USER.name), new SimpleGrantedAuthority(ROLE_MODERATOR.name));

      case ROLE_ADMIN:
        return Arrays.asList(
          new SimpleGrantedAuthority(ROLE_USER.name),
          new SimpleGrantedAuthority(ROLE_MODERATOR.name),
          new SimpleGrantedAuthority(ROLE_ADMIN.name)
        );
    }

    return new ArrayList<>();
  }

  public Boolean isFrozen() {
    return this.equals(ROLE_FROZEN);
  }

}