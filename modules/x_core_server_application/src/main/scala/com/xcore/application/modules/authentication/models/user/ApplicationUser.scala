package com.xcore.application.modules.authentication.models.user

import org.springframework.security.core.userdetails.UserDetails
import lombok.{Builder, NonNull}
import javax.persistence._
import java.io.Serializable
import java.security.Principal
import java.util.Date

import com.xcore.application.modules.authentication.models.role.EApplicationAccessLevel
import org.codehaus.jackson.annotate.JsonIgnore
import org.springframework.data.annotation.CreatedDate
import org.springframework.security.core.GrantedAuthority

@Entity
@Builder
class ApplicationUser extends Serializable with UserDetails with Principal {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  var id: Long = _;

  @Temporal(TemporalType.TIMESTAMP)
  @CreatedDate
  @Column(nullable = false, updatable = false)
  var created: Date = new Date();

  @Column
  @NonNull
  var role: EApplicationAccessLevel = _;

  @Column(length = 64, nullable = false, unique = true)
  @NonNull
  var username: String = _;

  @Column(length = 64, unique = true, nullable = false)
  @NonNull
  var mail: String = _;

  @Column(length = 64, nullable = false)
  @NonNull
  var password: String = _;

  def this(username: String, mail: String, password: String, role: EApplicationAccessLevel) = {

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
  def getId: Long = id;

  @JsonIgnore
  def getRole: EApplicationAccessLevel = role;

  @JsonIgnore
  def getPassword: String = password;

  @JsonIgnore
  override def getUsername: String = username;

  @JoinColumn
  override def getName: String = username;

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

  // Setters:

  def setUsername(username: String): Unit = this.username = username;

  def setPassword(password: String): Unit = this.password = password;

  def setMail(mail: String): Unit = this.mail = mail;

  def setRole(role: EApplicationAccessLevel): Unit = this.role = role;

  // Equals

  override def equals(obj: Any): Boolean = {
    if (obj == null || (!obj.isInstanceOf[ApplicationUser]))
      false;
    else
      this.id == obj.asInstanceOf[ApplicationUser].id &&
        this.username == obj.asInstanceOf[ApplicationUser].username && this.password == obj.asInstanceOf[ApplicationUser].password &&
        this.mail == obj.asInstanceOf[ApplicationUser].mail && this.role == obj.asInstanceOf[ApplicationUser].role;
  }

}
