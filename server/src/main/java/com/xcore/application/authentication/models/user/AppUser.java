package com.xcore.application.authentication.models.user;

import com.xcore.application.authentication.models.role.AppUserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class AppUser implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id")
    @NonNull
    private AppUserRole role;

    @Column(length = 64)
    @NonNull
    private String login;

    @Column(length = 64)
    @NonNull
    private String mail;

    @Column(length = 64)
    @NonNull
    private String password;

}
