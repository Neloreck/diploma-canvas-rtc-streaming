package com.xcore.application.authentication.models.role;

import java.util._

import com.xcore.application.authentication.models.role.EAppUserRoleAccessLevel.ERoleAccessLevel
import com.xcore.application.authentication.models.user.AppUser
import javax.persistence._

import scala.beans.BeanProperty;

@Entity
class AppUserRole()
  extends Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @BeanProperty
    @Column
    var id: Long = _;

    @Column(length = 64)
    @BeanProperty
    var name: String = "default";

    @Column
    @BeanProperty
    var accessLevel: ERoleAccessLevel = EAppUserRoleAccessLevel.FROZEN;

    @OneToMany(mappedBy = "id")
    @BeanProperty
    var users: List[AppUser] = new ArrayList[AppUser];

}

