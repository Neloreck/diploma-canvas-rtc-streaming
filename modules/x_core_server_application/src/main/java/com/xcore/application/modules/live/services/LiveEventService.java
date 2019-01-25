package com.xcore.application.modules.live.services;

import com.xcore.application.modules.authentication.exceptions.UserNotFoundException;
import com.xcore.application.modules.authentication.models.user.ApplicationUser;
import com.xcore.application.modules.authentication.models.user.IApplicationUserRepository;
import com.xcore.application.modules.live.exceptions.event.EventNotFoundException;
import com.xcore.application.modules.live.models.events.ILiveEventRepository;
import com.xcore.application.modules.live.models.events.LiveEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

  public final LiveEvent getLiveEventById(final UUID eventId) throws EventNotFoundException {

    Optional<LiveEvent> event = this.liveEventRepository.findById(eventId);

    if (event.isPresent()) {
      return event.get();
    } else {
      throw new EventNotFoundException();
    }
  }

  public final LiveEvent getUserActiveEvent(final ApplicationUser applicationUser) {

    final List<LiveEvent> events = this.liveEventRepository.findLiveEventsByOwner_IdAndFinishedOrderByCreated(applicationUser.getId(), false);

    if (events.isEmpty()) {
      return null;
    } else {
      return events.get(0);
    }
  }

  public final LiveEvent createLiveEvent(
    final Long ownerId, final String name, final String description,
    final Boolean secured, final String securedKey
  ) throws UserNotFoundException {

    final Optional<ApplicationUser> owner = this.applicationUserRepository.findById(ownerId);

    if (owner.isPresent()) {
      return this.liveEventRepository.save(new LiveEvent(owner.get(), name, description, secured, securedKey));
    } else {
      throw new UserNotFoundException();
    }
  }

  public final LiveEvent setFinished(final UUID liveEventId) throws EventNotFoundException {

    final Optional<LiveEvent> eventOptional = this.liveEventRepository.findById(liveEventId);

    if (eventOptional.isPresent()) {

      final LiveEvent event = eventOptional.get();

      event.setFinished(true);

      return this.liveEventRepository.save(event);

    } else {
      throw new EventNotFoundException();
    }
  }

}
