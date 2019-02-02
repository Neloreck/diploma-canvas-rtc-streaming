package com.xcore.application.modules.live.models.events;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;


public interface ILiveEventRepository extends CrudRepository<LiveEvent, UUID> {

  @Transactional(readOnly = true)
  List<LiveEvent> findLiveEventsByOwner_IdAndFinishedOrderByCreated(Long userId, Boolean finished);

}
