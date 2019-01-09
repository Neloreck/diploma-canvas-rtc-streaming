package com.xcore.application.modules.live.services;

import com.xcore.application.modules.authentication.models.user.ApplicationUser;
import com.xcore.application.modules.live.models.sessions.LiveStreamingSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j(topic = "[LIVE SESSION SERVICE]")
@Service
public class LiveSessionService {

  private Map<String, LiveStreamingSession> liveSessions = new ConcurrentHashMap<>();

  @Scheduled(fixedRate = 1000 * 60 * 5)
  public void logActivity() {
    log.info("[SCHEDULED] Currently active sessions: {}.", this.liveSessions.size());
  }

  public void createLiveSession(final String sessionId, final ApplicationUser applicationUser) {

    if (this.liveSessions.containsKey(sessionId)) {
      throw new DuplicateKeyException("Cannot create duplicate session, only one connection per user is allowed.");
    }

    this.liveSessions.put(sessionId, new LiveStreamingSession(sessionId, applicationUser.getUsername(), applicationUser.getId()));

    log.info("Session created, id: '{}', currently active: {}.", sessionId, liveSessions.size());
  }

  public void removeLiveSession(final String sessionId) {

    this.liveSessions.get(sessionId).dispose();
    this.liveSessions.remove(sessionId);

    log.info("Session closed, id: '{}', currently active: {}.", sessionId, liveSessions.size());
  }

  public LiveStreamingSession getSession(final String sessionId) {
    return liveSessions.get(sessionId);
  }

  public Integer getActiveSessionsCount() {
    return liveSessions.size();
  }

  public Set<String> getLiveUsersIds() {
    return liveSessions.keySet();
  }

}
