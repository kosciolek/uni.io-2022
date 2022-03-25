package com.javafee.uhsapp.controller.web;

import java.security.NoSuchAlgorithmException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.javafee.uhsapp.model.domain.UserData;
import com.javafee.uhsapp.service.CustomUserDetailsService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping() // TODO: uzupełnić requestMapping
@RequiredArgsConstructor
public class LoginController {
	private final CustomUserDetailsService userDetailsService;
	//TODO: handle showLoginPage, showRegistrationPage

	//TODO: handle PostMapping register
//	public String register(@ModelAttribute("user") UserData userData) throws NoSuchAlgorithmException{
//		try{
//			userDetailsService.createUser(userData.getLogin(), userData.getPassword());
//
//		}
//	}
}
