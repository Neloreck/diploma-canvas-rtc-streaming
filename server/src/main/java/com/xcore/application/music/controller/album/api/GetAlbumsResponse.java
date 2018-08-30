package com.xcore.application.music.controller.album.api;

import com.xcore.application.music.model.music.album.Album;
import com.xcore.server.controller.rest.general.api.Response;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class GetAlbumsResponse extends Response {

  final List<Album> albums = new ArrayList<>();

}
