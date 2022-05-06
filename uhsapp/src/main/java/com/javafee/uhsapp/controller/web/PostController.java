package com.javafee.uhsapp.controller.web;

import com.javafee.uhsapp.model.domain.Post;
import com.javafee.uhsapp.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/postService")
public class PostController {
    private final PostService postService;

    @GetMapping("/getPosts")
    public List<Post> getAllPosts(){
        return postService.findAll();
    }

    @PostMapping("/save")
    public String save(@RequestBody Post post, @RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient,
                       @AuthenticationPrincipal OAuth2User oauth2User) {
        postService.save(post, oauth2User.getAttributes().get("email").toString());
        // TODO: handle redirect or sth
        return "post created";
    }

    @PostMapping("/delete/{postId}")
    public String delete(@PathVariable("postId") Integer postId, @RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient,
                         @AuthenticationPrincipal OAuth2User oauth2User){
        if(oauth2User.getAttributes().get("email").toString().equals(postService.getById(postId).getUserData().getLogin())) {
            postService.delete(postId);
            return "post deleted";
        }
        return "post didnt deleted";
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
        for (String key : attributes.keySet()){
            Object value = attributes.get(key);
            acc += "<div>"+key + ":&nbsp" + value.toString() + "</div>";
        }
        return acc + "</div>";
    }



}
