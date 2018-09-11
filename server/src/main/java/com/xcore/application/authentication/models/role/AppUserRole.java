package com.xcore.application.authentication.models.role;

import com.xcore.application.authentication.models.user.AppUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class AppUserRole implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long id;

    @Column(length = 64)
    @NonNull
    private String name;

    @Column
    @NonNull
    private ERoleAccessLevel accessLevel;

    @OneToMany(mappedBy = "id")
    private List<AppUser> users;

}

