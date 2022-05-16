package com.agh.humanitarius.model.repository;

import java.util.List;

import com.agh.humanitarius.model.domain.UserData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDataRepository extends JpaRepository<UserData, Integer> {
	UserData findByLogin(String login);

	List<UserData> findAllByLogin(String login);
}
