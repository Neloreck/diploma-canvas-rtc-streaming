package com.xcore.application.music.controller.album;

import com.xcore.application.music.controller.album.api.*;
import com.xcore.application.music.model.music.album.Album;
import com.xcore.application.music.model.music.album.AlbumRepository;
import com.xcore.server.controller.rest.general.api.ErrorResponse;
import com.xcore.server.controller.rest.general.api.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/music/albums")
@Slf4j(topic = "[♨️ AlbumController]")
public class AlbumController {

  private final AlbumRepository albumRepository;

  @Autowired
  public AlbumController(AlbumRepository albumRepository) {
    this.albumRepository = albumRepository;
  }

  @PostMapping
  public Response createAlbum(final CreateAlbumRequest createAlbumRequest) {
    log.info("Got create album request: {}.", createAlbumRequest);
    final Album newAlbum = createAlbumRequest.getNewAlbum();

    try {
      albumRepository.save(newAlbum);
      return new Response();
    } catch (Exception ex) {
      return new ErrorResponse(ex);
    }
  }

  @DeleteMapping
  public DeleteAlbumsResponse deleteAlbums(DeleteAlbumsRequest deleteAlbumsRequest) {

    log.info("Got delete request for ids: {}.", deleteAlbumsRequest.getIdsToRemove());

    final DeleteAlbumsResponse deleteAlbumsResponse = new DeleteAlbumsResponse();
    final List<Long> idsToRemove = deleteAlbumsRequest.getIdsToRemove();

    for(final Long id : idsToRemove) {
      try {
        albumRepository.deleteById(id);
        deleteAlbumsResponse.getRemoved().add(id);
      } catch (Exception ex) {
        deleteAlbumsResponse.getErrors().add(ex.getMessage());
      }
    }

    return deleteAlbumsResponse;
  }

  @GetMapping("/all")
  public GetAlbumsResponse getAllAlbums() {
    log.info("Got all albums request.");

    final GetAlbumsResponse getAlbumsResponse = new GetAlbumsResponse();
    final Iterable<Album> albumIterable = albumRepository.findAll();

    albumIterable.forEach(getAlbumsResponse.getAlbums()::add);

    return getAlbumsResponse;
  }

  @GetMapping("/{id}")
  public GetAlbumResponse getAlbumById(@PathVariable final Long id) {
    final Optional<Album> searchedAlbumOptional = albumRepository.findById(id);

    if(searchedAlbumOptional.isPresent()) {
      return GetAlbumResponse.builder().album(searchedAlbumOptional.get()).build();
    } else {
      return new GetAlbumResponse();
    }
  }

  @PutMapping("/{id}")
  public GetAlbumResponse updateAlbumById(@PathVariable final Long id) {
    final Optional<Album> searchedAlbumOptional = albumRepository.findById(id);

    if(searchedAlbumOptional.isPresent()) {
      return GetAlbumResponse.builder().album(searchedAlbumOptional.get()).build();
    } else {
      return new GetAlbumResponse();
    }
  }

}
