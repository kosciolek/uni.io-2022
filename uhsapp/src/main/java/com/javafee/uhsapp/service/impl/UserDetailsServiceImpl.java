package com.javafee.uhsapp.service.impl;

import java.security.NoSuchAlgorithmException;

import javax.security.auth.login.LoginException;

import com.javafee.uhsapp.model.domain.UserData;
import com.javafee.uhsapp.model.repository.UserDataRepository;
import org.springframework.stereotype.Service;

import com.javafee.uhsapp.service.CustomUserDetailsService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements CustomUserDetailsService {

	private final UserDataRepository userDataRepository;



	@Override
	public void createUser(String login, String name) throws NoSuchAlgorithmException, LoginException {
		if (!userDataRepository.findAllByLogin(login).isEmpty())
			throw new LoginException("User with given login already exists");
		userDataRepository.save(
				UserData.builder()
						.login(login)
						.name(name)
						.build());
	}

}
