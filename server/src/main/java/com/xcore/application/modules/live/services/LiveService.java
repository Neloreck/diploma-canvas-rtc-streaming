package com.xcore.application.modules.live.services;

import com.xcore.application.modules.live.models.LiveSession;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class LiveService {

  private Map<String, LiveSession> liveSessions = new ConcurrentHashMap<>();

  public void createLiveSession(final String sessionId, final Long usedId) {

    if (this.liveSessions.containsKey(sessionId)) {
      throw new DuplicateKeyException("Cannot create duplicate session, only one connection per user is allowed.");
    }

    this.liveSessions.put(
      sessionId,
      new LiveSession(sessionId, usedId)
    );
  }

  public void removeLiveSession(final String sessionId) {
    this.liveSessions.get(sessionId).dispose();
    this.liveSessions.remove(sessionId);
  }

  public LiveSession getSession(final String sessionId) {
    return liveSessions.get(sessionId);
  }

  public Integer getActiveSessionsCount() {
    return liveSessions.size();
  }

  public Set<String> getLiveUserIds() {
    return liveSessions.keySet();
  }

}
