package com.xcore.application.modules.live.services;

import com.xcore.application.modules.authentication.exceptions.UserNotFoundException;
import com.xcore.application.modules.authentication.models.user.ApplicationUser;
import com.xcore.application.modules.authentication.models.user.IApplicationUserRepository;
import com.xcore.application.modules.live.exceptions.EventNotFoundException;
import com.xcore.application.modules.live.models.events.ILiveEventRepository;
import com.xcore.application.modules.live.models.events.LiveEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Slf4j(topic = "[LIVE EVENT SERVICE]")
@Service
public final class LiveEventService {

  @Autowired
  private ILiveEventRepository liveEventRepository;

  @Autowired
  private IApplicationUserRepository applicationUserRepository;

  /*
   * Methods:
   */

  public LiveEvent getLiveEventById(final String eventId) throws EventNotFoundException {

    Optional<LiveEvent> event = liveEventRepository.findById(eventId);

    if (event.isPresent()) {
      return event.get();
    } else {
      throw new EventNotFoundException();
    }

  }

  public final List<LiveEvent> getLiveEvents() {

    final List<LiveEvent> liveEvents = new ArrayList<>();
    final Iterable<LiveEvent> iterable = liveEventRepository.findAll();

    iterable.forEach(liveEvents::add);

    return liveEvents;
  }

  public final LiveEvent createLiveEvent(
    final Long ownerId, final String name, final String description,
    final Boolean secured, final String securedKey
  ) throws UserNotFoundException {

    final Optional<ApplicationUser> owner = applicationUserRepository.findById(ownerId);

    if (owner.isPresent()) {
      return liveEventRepository.save(new LiveEvent(owner.get(), name, description, secured, securedKey));
    } else {
      throw new UserNotFoundException();
    }
  }

}
