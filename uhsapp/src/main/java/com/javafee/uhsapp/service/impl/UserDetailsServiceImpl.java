package com.javafee.uhsapp.service.impl;

import java.security.NoSuchAlgorithmException;

import javax.security.auth.login.LoginException;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.javafee.uhsapp.service.CustomUserDetailsService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements CustomUserDetailsService {

	@Override
	public UserDetails loadUserByUsername(String login) {
		return null;
		//TODO: handle loadUserByUsername
	}

	@Override
	public void createUser(String login, String password) throws NoSuchAlgorithmException, LoginException {
		//TODO: handle create user
	}
}
