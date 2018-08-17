package com.xcore.application.music.model.music.track;

import com.xcore.application.music.model.music.artist.Artist;
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
public class Track implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @ManyToOne
  @NonNull
  @JoinColumn(name = "artist_id", nullable = false)
  private Artist artist;

  @Column
  @NonNull
  private String name;

  @Column
  @NonNull
  private String album;

  @Column
  @NonNull
  private Long duration;

  @Column
  private String genre;

  @Column
  @NonNull
  private ETrackFormat dataFormat;

  @Column
  private Short bitRate;

  @Column
  private Short year;

}
