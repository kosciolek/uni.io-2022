package com.agh.humanitarius.service;

import java.security.NoSuchAlgorithmException;

import javax.security.auth.login.LoginException;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface CustomUserDetailsService {

	void createUser(String login, String name) throws NoSuchAlgorithmException, LoginException;

}
