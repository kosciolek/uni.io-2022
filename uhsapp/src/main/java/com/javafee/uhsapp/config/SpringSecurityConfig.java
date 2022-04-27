package com.javafee.uhsapp.config;

import com.auth0.jwk.JwkProvider;
import com.auth0.jwk.JwkProviderBuilder;
import com.javafee.uhsapp.controller.web.LogoutHandler;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import com.auth0.AuthenticationController;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

@Data
@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

	private final LogoutHandler logoutHandler;


	public SpringSecurityConfig(LogoutHandler logoutHandler){
		this.logoutHandler = logoutHandler;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests()
				.antMatchers("/", "/login", "/callback").permitAll()
				.anyRequest().authenticated()
				.and().oauth2Login()
				.and()
				.logout()
				.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
				.addLogoutHandler(logoutHandler);
	}

	public String getContextPath(HttpServletRequest request) {
		String path = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
		return path;
	}
}
