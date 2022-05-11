package com.javafee.uhsapp.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javafee.uhsapp.model.domain.UserData;

public interface UserDataRepository extends JpaRepository<UserData, Integer> {
	UserData findByLogin(String login);

	List<UserData> findAllByLogin(String login);
}
