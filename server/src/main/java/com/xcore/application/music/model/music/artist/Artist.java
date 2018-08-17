package com.xcore.application.music.model.music.artist;

import com.xcore.application.music.model.music.album.Album;
import com.xcore.application.music.model.music.track.Track;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Artist implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @OneToMany(mappedBy = "artist")
  private Set<Album> albums;

  @OneToMany(mappedBy = "artist")
  private Set<Track> tracks;

  @Column
  @NonNull
  private String name;

  @Column
  private String genre;

  @Column
  private Short year;

}
