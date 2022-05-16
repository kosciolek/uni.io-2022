package com.agh.humanitarius.controller;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import com.agh.humanitarius.model.domain.Category;
import com.agh.humanitarius.model.domain.PostType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.agh.humanitarius.model.domain.Post;
import com.agh.humanitarius.service.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/postService")
public class PostController extends PagingAndSortingController {
	private final PostService postService;

	@GetMapping("/getPosts")
	public List<Post> getAllPosts() {
		return postService.findAll();
	}

	@GetMapping("/getPosts/{page}/{size}/{sortBy}")
	public ResponseEntity findAll(@PathVariable int page, @PathVariable int size, @PathVariable String sortBy) {
		try {
			Page<Post> pageTuts = postService.findAll(PageRequest.of(page, size, Sort.by(sortBy)));
			return !pageTuts.getContent().isEmpty() ? new ResponseEntity<>(prepareResponseMap(pageTuts), HttpStatus.OK)
					: new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getPosts/{userId}/{postTitle}/{page}/{size}/{sortBy}")
	public ResponseEntity findAll(@PathVariable Integer userId, @PathVariable String postTitle, @PathVariable int page, @PathVariable int size, @PathVariable String sortBy) {
		try {
			Page<Post> pageTuts = postService.findAllByUserIdAndTitle(userId, postTitle, PageRequest.of(page, size, Sort.by(sortBy)));
			return !pageTuts.getContent().isEmpty() ? new ResponseEntity<>(prepareResponseMap(pageTuts), HttpStatus.OK)
					: new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/save")
	public String save(@RequestBody @Valid Post post, @RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient,
	                   @AuthenticationPrincipal OAuth2User oauth2User) {
		postService.save(post, oauth2User.getAttributes().get("email").toString());
		// TODO: handle redirect or sth
		return "post created";
	}

	@PostMapping("/delete/{postId}")
	public String delete(@PathVariable("postId") Integer postId, @RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient,
	                     @AuthenticationPrincipal OAuth2User oauth2User) {
		if (oauth2User.getAttributes().get("email").toString().equals(postService.getById(postId).getUserData().getLogin())) {
			postService.delete(postId);
			return "post deleted";
		}
		return "post didnt deleted";
	}



	@GetMapping("/filter")
	public ResponseEntity findAll(@RequestParam List<PostType> postType, @RequestParam boolean status, @RequestParam List<Category> category) {
		return ResponseEntity.ok(postService.findAll());
	}

	@ResponseBody
	@PostMapping("/userinfo")
	public String oauthUserInfo(@RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient,
	                            @AuthenticationPrincipal OAuth2User oauth2User) {
		return "User Name: " + oauth2User.getName() + "<br/>" +
				"User Authorities: " + oauth2User.getAuthorities() + "<br/>" +
				"Client Name: " + authorizedClient.getClientRegistration().getClientId() + "<br/>" +
				this.prettyPrintAttributes(oauth2User.getAttributes());
	}

	private String prettyPrintAttributes(Map<String, Object> attributes) {
		String acc = "User Attributes: <br/><div style='padding-left:20px'>";
		for (String key : attributes.keySet()) {
			Object value = attributes.get(key);
			acc += "<div>" + key + ":&nbsp" + value.toString() + "</div>";
		}
		return acc + "</div>";
	}
}
