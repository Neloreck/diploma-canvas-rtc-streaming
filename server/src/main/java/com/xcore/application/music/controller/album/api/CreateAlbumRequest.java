package com.xcore.application.music.controller.album.api;

import com.xcore.application.music.model.music.album.Album;
import lombok.Data;

@Data
public class CreateAlbumRequest {

  private final Album newAlbum;

}
