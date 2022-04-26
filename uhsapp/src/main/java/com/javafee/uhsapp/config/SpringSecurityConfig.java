package com.javafee.uhsapp.config;

import com.auth0.jwk.JwkProvider;
import com.auth0.jwk.JwkProviderBuilder;
import com.javafee.uhsapp.controller.web.LogoutController;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import com.auth0.AuthenticationController;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

@Data
@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {
	@Value(value = "${com.auth0.domain}")
	private String domain;

	@Value(value = "${com.auth0.clientId}")
	private String clientId;

	@Value(value = "${com.auth0.clientSecret}")
	private String clientSecret;


	@Bean
	public AuthenticationController authenticationController(){
		JwkProvider jwkProvider = new JwkProviderBuilder(domain).build();
		return AuthenticationController.newBuilder(domain, clientId, clientSecret)
				.withJwkProvider(jwkProvider)
				.build();
	}

	@Bean
	public LogoutSuccessHandler logoutSuccessHandler() {
		return new LogoutController();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests()
				.antMatchers("/callback", "/login", "/").permitAll()
				.anyRequest().authenticated()
				.and()
				.logout()
				.logoutSuccessHandler(logoutSuccessHandler())
				.permitAll();
	}

	public String getContextPath(HttpServletRequest request) {
		String path = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
		return path;
	}
}
