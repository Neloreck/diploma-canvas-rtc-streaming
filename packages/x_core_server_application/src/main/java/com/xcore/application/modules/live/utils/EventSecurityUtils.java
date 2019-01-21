package com.xcore.application.modules.live.utils;

import com.xcore.application.modules.authentication.utils.AuthenticationUtils;
import com.xcore.application.modules.live.exceptions.event.EventNotBelongException;
import com.xcore.application.modules.live.models.events.LiveEvent;

public class EventSecurityUtils {

  public static void checkIfEventBelongsOrThrow(final LiveEvent event) throws EventNotBelongException {
     if (event.getOwner().getId() != AuthenticationUtils.getAuthorizedUser().getId()) {
       throw new EventNotBelongException();
     }
  }

}
