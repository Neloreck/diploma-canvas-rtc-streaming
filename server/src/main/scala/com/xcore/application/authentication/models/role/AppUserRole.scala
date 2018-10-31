package com.xcore.application.authentication.models.role;

import java.util._;

import com.xcore.application.authentication.models.user.AppUser;
import javax.persistence._;
import lombok.NonNull;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;

import scala.beans.BeanProperty;

@Entity
class AppUserRole extends Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @BeanProperty
    @Column
    @NonNull
    var id: Long = _;

    @Column(length = 64)
    @BeanProperty
    @NonNull
    var name: String = "default";

    @Column
    @BeanProperty
    @Enumerated(EnumType.STRING)
    @NonNull
    var accessLevel: EAppUserRoleAccessLevel = EAppUserRoleAccessLevel.ROLE_FROZEN;

    @OneToMany(mappedBy = "id")
    @BeanProperty
    @NonNull
    var users: List[AppUser] = new ArrayList[AppUser];

    @JsonIgnore
    def getAuthorities: List[GrantedAuthority] = accessLevel.getAuthorities();

}

