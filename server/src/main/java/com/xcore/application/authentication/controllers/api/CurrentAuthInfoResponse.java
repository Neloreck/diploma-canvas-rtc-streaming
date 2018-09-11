package com.xcore.application.authentication.controllers.api;

import com.xcore.server.controllers.rest.general.api.Response;
import lombok.Data;
import org.springframework.security.core.Authentication;

@Data
public class CurrentAuthInfoResponse extends Response {

    private Boolean authenticated = null;


    public CurrentAuthInfoResponse(Authentication authentication) {
        this.authenticated = authentication.isAuthenticated();
    }

}
