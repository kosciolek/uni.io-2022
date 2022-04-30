package com.javafee.uhsapp.service;

import java.security.NoSuchAlgorithmException;

import javax.security.auth.login.LoginException;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface CustomUserDetailsService extends UserDetailsService {
	UserDetails loadUserByUsername(String login);

	void createUser(String login) throws NoSuchAlgorithmException, LoginException;

}
