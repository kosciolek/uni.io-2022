package com.javafee.uhsapp.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.javafee.uhsapp.model.domain.Test;
import com.javafee.uhsapp.model.repository.TestRepository;

@Service
public class TestService {
	private TestRepository testRepository;

	public List<Test> getAll(){
		return testRepository.findAll();
	}
}
