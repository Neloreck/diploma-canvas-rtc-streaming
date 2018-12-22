package com.xcore.application.authentication.models.user;

import org.springframework.security.core.userdetails.UserDetails
import lombok.NonNull
import javax.persistence._
import java.io.Serializable

import com.xcore.application.authentication.models.role.EAppAccessLevel
import org.codehaus.jackson.annotate.JsonIgnore
import org.springframework.security.core.GrantedAuthority

import scala.beans.BeanProperty

@Entity
class AppUser extends Serializable with UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  var id: Long = _;

  @Column()
  @BeanProperty
  @NonNull
  var role: EAppAccessLevel = _;

  @Column(length = 64, nullable = false, unique = true)
  @BeanProperty
  @NonNull
  var username: String = _;

  @Column(length = 64, unique = true, nullable = false)
  @NonNull
  @BeanProperty
  var mail: String = _;

  @Column(length = 64, nullable = false)
  @NonNull
  @BeanProperty
  var password: String = _;

  def this(username: String, mail: String, password: String, role: EAppAccessLevel) = {

    this();

    this.username = username;
    this.mail = mail;
    this.password = password;
    this.role = role;
  }

  /*
   * Computed:
   */

  @JsonIgnore
  override def getAuthorities: java.util.List[GrantedAuthority] = role.getAuthorities;

  @JsonIgnore
  override def isAccountNonLocked: Boolean = this.role.isActive;

  @JsonIgnore
  override def isAccountNonExpired: Boolean = true;

  @JsonIgnore
  override def isCredentialsNonExpired: Boolean = true;

  @JsonIgnore
  override def isEnabled: Boolean = this.role.isActive;

}
