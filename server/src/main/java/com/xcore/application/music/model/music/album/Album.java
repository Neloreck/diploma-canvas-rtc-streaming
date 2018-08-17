package com.xcore.application.music.model.music.album;

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
public class Album implements Serializable {

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
  private String genre;

  @Column
  private Short year;

}
