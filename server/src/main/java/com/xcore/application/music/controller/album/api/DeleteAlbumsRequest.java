package com.xcore.application.music.controller.album.api;

import com.xcore.server.controller.general.api.Response;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class DeleteAlbumsRequest extends Response {

  final List<Long> idsToRemove = new ArrayList<>();

}
