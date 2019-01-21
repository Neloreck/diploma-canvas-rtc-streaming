package com.xcore.application.modules.live.models.events;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.*;

@Data
@AllArgsConstructor
@Entity
public class LiveEventLayoutBookmark {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private Date created = new Date();

  // Mapped.

  @NonNull
  @JsonIgnore
  @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private LiveEvent liveEvent;

  @Embedded
  private List<LiveEventGraphicsObject> graphicsObjects = new ArrayList<>();

  // Own.

  @Column
  private String name;

  public LiveEventLayoutBookmark(final LiveEvent liveEvent, final String name) {
    this.liveEvent = liveEvent;
    this.name = name;
    this.graphicsObjects = new ArrayList<>();
  }

  public LiveEventLayoutBookmark() {}

}
