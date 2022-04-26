package com.javafee.uhsapp.controller.web;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.javafee.uhsapp.config.SpringSecurityConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.auth0.AuthenticationController;
import com.auth0.IdentityVerificationException;
import com.auth0.Tokens;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;

@Controller
public class LoginController {

	@Autowired
	private AuthenticationController authenticationController;

	@Autowired
	private SpringSecurityConfig config;

	@GetMapping(value = "/login")
	protected void login(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String redirectUri = config.getContextPath(request) + "/callback";
		String authorizeUrl = authenticationController.buildAuthorizeUrl(request, response, redirectUri)
				.withScope("openid email")
				.build();
		response.sendRedirect(authorizeUrl);
	}

	@GetMapping(value="/callback")
	public void callback(HttpServletRequest request, HttpServletResponse response) throws IOException, IdentityVerificationException {
		Tokens tokens = authenticationController.handle(request, response);

		DecodedJWT jwt = JWT.decode(tokens.getIdToken());
		TestingAuthenticationToken authToken2 = new TestingAuthenticationToken(jwt.getSubject(), jwt.getToken());
		authToken2.setAuthenticated(true);

		SecurityContextHolder.getContext().setAuthentication(authToken2);
		response.sendRedirect(config.getContextPath(request) + "/");
	}



}
