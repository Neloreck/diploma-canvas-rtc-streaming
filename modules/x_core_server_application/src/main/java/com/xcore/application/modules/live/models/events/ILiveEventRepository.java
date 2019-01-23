package com.xcore.application.modules.live.models.events;

import org.springframework.data.repository.CrudRepository;

import java.util.UUID;


public interface ILiveEventRepository extends CrudRepository<LiveEvent, UUID> {
}
