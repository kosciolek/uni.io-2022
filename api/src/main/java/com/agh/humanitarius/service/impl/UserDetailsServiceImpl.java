package com.agh.humanitarius.service.impl;

import java.security.NoSuchAlgorithmException;

import javax.security.auth.login.LoginException;

import com.agh.humanitarius.model.domain.UserData;
import com.agh.humanitarius.model.repository.UserDataRepository;
import com.agh.humanitarius.service.CustomUserDetailsService;
import org.springframework.stereotype.Service;

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
