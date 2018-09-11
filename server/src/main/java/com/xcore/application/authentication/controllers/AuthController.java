package com.xcore.application.authentication.controllers;

import com.xcore.application.authentication.controllers.api.CurrentAuthInfoResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/auth")
@RestController
public class AuthController {

    @GetMapping("/info")
    public CurrentAuthInfoResponse getCurrentAuthInfo() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return new CurrentAuthInfoResponse(authentication);
    }

    @PostMapping("/logout")
    public CurrentAuthInfoResponse logout() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        authentication.setAuthenticated(false);

        return new CurrentAuthInfoResponse(authentication);
    }

}
