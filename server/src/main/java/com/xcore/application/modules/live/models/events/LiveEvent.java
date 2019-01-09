package com.xcore.application.modules.live.models.events;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.xcore.application.modules.authentication.models.user.ApplicationUser;
import lombok.Data;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
public class LiveEvent {

  @Id
  @Column
  private String id;

  @NonNull
  @JsonIgnore
  @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private ApplicationUser owner;

  @Column
  private String name;

  @Column
  private String description;

  @Column
  private Date created = new Date();

  // Privacy.

  @Column
  private Boolean secured = false;

  @Column
  private String securedKey = null;

  // State.

  @Column
  private Boolean started = false;

  @Column
  private Boolean finished = false;

  public LiveEvent(final ApplicationUser owner, final String name, final String description, final Boolean secured, final String securedKey) {

    this.id = UUID.randomUUID().toString();
    this.owner = owner;

    this.name = name;
    this.description = description;

    this.secured = secured;
    this.securedKey = securedKey;
  }

}
