package com.xcore.application.modules.authentication.models.role;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
public enum EApplicationAccessLevel {

  ROLE_ANONYMOUS("ROLE_ANONYMOUS"), ROLE_FROZEN("ROLE_FROZEN"), ROLE_USER("ROLE_USER"),
  ROLE_MODERATOR("ROLE_MODERATOR"), ROLE_ADMIN("ROLE_ADMIN"), ROLE_APPLICATION("ROLE_APPLICATION");

  private final String role;

  public List<GrantedAuthority> getAuthorities() {

    switch (this) {

      case ROLE_FROZEN:
        return Collections.singletonList(new SimpleGrantedAuthority(ROLE_FROZEN.role));

      case ROLE_USER:
        return Collections.singletonList(new SimpleGrantedAuthority(ROLE_USER.role));

      case ROLE_MODERATOR:
        return Arrays.asList(
            new SimpleGrantedAuthority(ROLE_USER.role),
            new SimpleGrantedAuthority(ROLE_MODERATOR.role)
        );

      case ROLE_ADMIN:
        return Arrays.asList(
          new SimpleGrantedAuthority(ROLE_USER.role),
          new SimpleGrantedAuthority(ROLE_MODERATOR.role),
          new SimpleGrantedAuthority(ROLE_ADMIN.role)
        );

      case ROLE_APPLICATION:
        return Collections.singletonList(new SimpleGrantedAuthority(ROLE_APPLICATION.role));

      default:
        return Collections.singletonList(new SimpleGrantedAuthority(ROLE_ANONYMOUS.role));
    }
  }

  public String getRole() {
    return role;
  }

  public GrantedAuthority getAuthority() {
    return new SimpleGrantedAuthority(role);
  }

  public Boolean isActive() {
    return !this.equals(ROLE_FROZEN);
  }

}