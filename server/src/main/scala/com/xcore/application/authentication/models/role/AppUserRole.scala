package com.xcore.application.authentication.models.role;

import javax.persistence._
import lombok.NonNull
import org.springframework.security.core.GrantedAuthority

import scala.beans.BeanProperty;

@Entity
class AppUserRole extends Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @BeanProperty
    var id: Long = _;

    @Column(length = 64, unique = true)
    @BeanProperty
    @NonNull
    var name: String = "default";

    @Column(unique = true)
    @BeanProperty
    @Enumerated(EnumType.STRING)
    @NonNull
    var accessLevel: EAppUserRoleAccessLevel = EAppUserRoleAccessLevel.ROLE_FROZEN;

    @Transient
    def getAuthorities: java.util.List[GrantedAuthority] = accessLevel.getAuthorities;

}

