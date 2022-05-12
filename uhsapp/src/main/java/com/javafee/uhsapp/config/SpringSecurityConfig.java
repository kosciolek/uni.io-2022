package com.javafee.uhsapp.config;

import com.javafee.uhsapp.config.oauth.CustomOidcUserService;
import com.javafee.uhsapp.controller.LogoutHandler;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


@Data
@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

	private final LogoutHandler logoutHandler;

	@Autowired private CustomOidcUserService customOidcUserService;
	public SpringSecurityConfig(LogoutHandler logoutHandler){
		this.logoutHandler = logoutHandler;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests()
				.antMatchers("/", "/login", "/callback").permitAll()
				.anyRequest().authenticated()
				.and()
				.oauth2Login()
					.userInfoEndpoint()
						.oidcUserService(customOidcUserService)
				.and()
				.and()
				.logout()
				.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
				.addLogoutHandler(logoutHandler);
	}
}
