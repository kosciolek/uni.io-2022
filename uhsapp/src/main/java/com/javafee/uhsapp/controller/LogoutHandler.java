package com.javafee.uhsapp.controller;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
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

    @Value(value = "${spring.security.oauth2.client.registration.auth0.domain}")
    private String domain;

    @Value(value = "${spring.security.oauth2.client.registration.auth0.client-id}")
    private String clientId;

    @Value(value = "${spring.security.oauth2.client.registration.auth0.client-secret}")
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
        // https://dev-qmx75p4q.us.auth0.com/v2/logout?client_id=$%7Bspring.security.oauth2.client.registration.auth0.client-id&returnTo=http://localhost:3000/
        // https://dev-qmx75p4q.us.auth0.com/v2/logout?client_id=$%7Bspring.security.oauth2.client.registration.auth0.client-id&returnTo=http://localhost:3000/
        try {
            response.sendRedirect(logoutUrl);
        } catch (IOException e) {
            log.severe(e.getMessage());
        }
    }
}