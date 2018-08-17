package com.xcore.application.music.controller.artist;

import com.xcore.application.music.model.music.artist.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/music/artists")
public class ArtistController {

  @Autowired
  ArtistRepository artistRepository;




}
