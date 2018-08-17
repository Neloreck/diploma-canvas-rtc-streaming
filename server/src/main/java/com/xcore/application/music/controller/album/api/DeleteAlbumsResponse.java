package com.xcore.application.music.controller.album.api;

import com.xcore.server.controller.general.api.Response;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class DeleteAlbumsResponse extends Response {

  final List<Long> removed = new ArrayList<>();
  final List<String> errors = new ArrayList<>();

}
