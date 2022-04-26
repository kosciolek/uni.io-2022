package com.javafee.uhsapp.controller.web;

import com.javafee.uhsapp.config.SpringSecurityConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import lombok.extern.java.Log;

@Controller
@Log
public class LogoutController implements LogoutSuccessHandler {

    @Autowired
    private SpringSecurityConfig config;


    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response,
                                Authentication authentication) {

        if (request.getSession() != null) {
            request.getSession().invalidate();
        }
        String returnTo = "http://localhost:3000/";
        String logoutUrl = String.format(
        "https://%s/v2/logout?client_id=%s&returnTo=%s",
                config.getDomain(),
                config.getClientId(),
                returnTo);
        try {
            response.sendRedirect(logoutUrl);
        } catch (IOException e) {
            log.severe(e.getMessage());
        }
    }
}