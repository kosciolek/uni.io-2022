package com.javafee.uhsapp.controller.web;

import com.javafee.uhsapp.config.SpringSecurityConfig;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import lombok.extern.java.Log;

@Data
@Controller
@Log
public class LogoutHandler extends SecurityContextLogoutHandler {

    @Value(value = "${com.auth0.domain}")
    private String domain;

    @Value(value = "${com.auth0.clientId}")
    private String clientId;

    @Value(value = "${com.auth0.clientSecret}")
    private String clientSecret;



    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response,
                                Authentication authentication) {

        if (request.getSession() != null) {
            request.getSession().invalidate();
        }
        String returnTo = "http://localhost:3000/";
        String logoutUrl = String.format(
        "https://%s/v2/logout?client_id=%s&returnTo=%s",
                getDomain(),
                getClientId(),
                returnTo);
        try {
            response.sendRedirect(logoutUrl);
        } catch (IOException e) {
            log.severe(e.getMessage());
        }
    }
}