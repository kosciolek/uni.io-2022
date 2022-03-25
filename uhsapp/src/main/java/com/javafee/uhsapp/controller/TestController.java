package com.javafee.uhsapp.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javafee.uhsapp.service.impl.TestService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/api/test", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class TestController {
	private final TestService testService;

	@GetMapping
	public ResponseEntity findAll(){
		return ResponseEntity.ok(testService.getAll());
	}
}
