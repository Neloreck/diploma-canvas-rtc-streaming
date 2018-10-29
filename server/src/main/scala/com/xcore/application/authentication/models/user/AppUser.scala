package com.xcore.application.authentication.models.user;

import com.xcore.application.authentication.models.role.AppUserRole;
import lombok.{Data, NonNull};
import javax.persistence._;
import java.io.Serializable;

import scala.beans.BeanProperty;

@Data
@Entity
class AppUser extends Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column
  var id: Long = _;

  @ManyToOne(fetch = FetchType.LAZY)
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

}
