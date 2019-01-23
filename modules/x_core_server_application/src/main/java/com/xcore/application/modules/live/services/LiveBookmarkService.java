package com.xcore.application.modules.live.services;

import com.xcore.application.modules.live.exceptions.event.LayoutBookmarkNotFoundException;
import com.xcore.application.modules.live.models.events.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;


@Slf4j(topic = "[LIVE BOOKMARK SERVICE]")
@Service
public final class LiveBookmarkService {

  @Autowired
  private ILiveEventLayoutBookmarkRepository liveEventLayoutBookmarkRepository;

  /*
   * Methods:
   */

  public LiveEventLayoutBookmark getLayoutBookmark(final Long bookmarkId) throws LayoutBookmarkNotFoundException {

    final Optional<LiveEventLayoutBookmark> optionalLiveEventLayoutBookmark = liveEventLayoutBookmarkRepository.findById(bookmarkId);

    if (optionalLiveEventLayoutBookmark.isPresent()) {
      return optionalLiveEventLayoutBookmark.get();
    } else {
      throw new LayoutBookmarkNotFoundException();
    }
  }

  public LiveEventLayoutBookmark updateBookmarkGraphics(final LiveEventLayoutBookmark liveEventLayoutBookmark, final List<LiveEventGraphicsObject> objects) {

    liveEventLayoutBookmark.setGraphicsObjects(objects);

    return liveEventLayoutBookmarkRepository.save(liveEventLayoutBookmark);
  }

  public Set<LiveEventLayoutBookmark> getLiveEventBookmarks(final UUID liveEventId) {
    return liveEventLayoutBookmarkRepository.findLiveEventLayoutBookmarkByLiveEvent_Id(liveEventId);
  }

  public LiveEventLayoutBookmark createBookmark(final LiveEvent liveEvent, final String name) {
    return liveEventLayoutBookmarkRepository.save(new LiveEventLayoutBookmark(liveEvent, name));
  }

}
