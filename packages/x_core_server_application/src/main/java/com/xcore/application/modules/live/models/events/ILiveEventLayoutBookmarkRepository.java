package com.xcore.application.modules.live.models.events;

import org.springframework.data.repository.CrudRepository;

import java.util.Set;
import java.util.UUID;

public interface ILiveEventLayoutBookmarkRepository extends CrudRepository<LiveEventLayoutBookmark, Long> {

  public Set<LiveEventLayoutBookmark> findLiveEventLayoutBookmarkByLiveEvent_Id(final UUID liveEventId);

}
