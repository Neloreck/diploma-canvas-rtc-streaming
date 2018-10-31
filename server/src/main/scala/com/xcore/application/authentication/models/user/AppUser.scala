package com.xcore.application.authentication.models.user;

import com.xcore.application.authentication.models.role.AppUserRole;
import org.springframework.security.core.userdetails.UserDetails;
import lombok.{Data, NonNull};
import javax.persistence._;
import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;

import scala.beans.BeanProperty;

@Data
@Entity
class AppUser extends Serializable with UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column
  var id: Long = _;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "role_id")
  @BeanProperty
  @NonNull
  var role: AppUserRole = _;

  @Column(length = 64)
  @NonNull
  @BeanProperty
  var login: String = _;

  @Column(length = 64)
  @NonNull
  @BeanProperty
  var mail: String = _;

  @Column(length = 64)
  @NonNull
  @BeanProperty
  var password: String = _;

  /*
   * Computed:
   */

  @JsonIgnore
  override def getUsername: String = this.login;

  @JsonIgnore
  override def getAuthorities: List[GrantedAuthority] = role.getAuthorities;

  @JsonIgnore
  override def isAccountNonLocked: Boolean = !this.role.accessLevel.isFrozen;

  @JsonIgnore
  override def isAccountNonExpired: Boolean = true;

  @JsonIgnore
  override def isCredentialsNonExpired: Boolean = true;

  @JsonIgnore
  override def isEnabled: Boolean = !this.role.accessLevel.isFrozen;

}
