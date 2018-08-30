package com.xcore.application.music.controller.album.api;

import com.xcore.application.music.model.music.album.Album;
import com.xcore.server.controller.rest.general.api.Response;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetAlbumResponse extends Response {

  Album album;

}
