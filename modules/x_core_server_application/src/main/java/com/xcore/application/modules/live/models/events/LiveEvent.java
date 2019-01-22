package com.xcore.application.modules.live.models.events;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.xcore.application.modules.authentication.models.user.ApplicationUser;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@NoArgsConstructor
@Entity
@Data
public class LiveEvent {

  @Id
  @Column
  private UUID id;

  /*
   * Mapped related values.
   */

  @NonNull
  @JsonIgnore
  @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private ApplicationUser owner;

  /*
   * Own values.
   */

  @Column
  private String name;

  @Column
  private String description;

  @Column(nullable = false, updatable = false)
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

    this.id = UUID.randomUUID();
    this.owner = owner;
    this.name = name;
    this.description = description;
    this.secured = secured;
    this.securedKey = securedKey;
  }

}
