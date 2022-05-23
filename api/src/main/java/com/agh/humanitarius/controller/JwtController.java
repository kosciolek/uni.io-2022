package com.agh.humanitarius.controller;

import java.io.Serializable;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@RestController
@RequestMapping("/getToken")
public class JwtController {
	@GetMapping
	public String getAccessToken() throws UnirestException {
		HttpResponse<String> response = Unirest.post("https://dev-qmx75p4q.us.auth0.com/oauth/token")
				.header("content-type", "application/x-www-form-urlencoded")
				.body("grant_type=client_credentials&client_id=kzNbf1YooKjTeHh0vHt7jAxbwkK28gdT&client_secret=AlrCb2ChlSewDEGRPku5Czs8s5ILPomCwi5Ft_E9rSuU2gA7wZM0-Bg2SBF_iieF&audience=https://humanitarius/api")
				.asString();
		return response.getBody();
	}

	@NoArgsConstructor
	@AllArgsConstructor
	@Getter
	@ToString
	class Jwt implements Serializable {
		@JsonProperty("access_token")
		private String accessToken;
		@JsonProperty("expires_in")
		private int expiresIn;
		@JsonProperty("token_type")
		private String tokenType;
	}
}
