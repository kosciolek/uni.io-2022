package com.agh.humanitarius.controller;

import com.agh.humanitarius.model.domain.UserData;
import com.agh.humanitarius.service.CommentService;
import com.agh.humanitarius.model.domain.Comment;
import com.agh.humanitarius.model.repository.UserDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/commentService")
public class CommentController {
    private final CommentService commentService;
    private final UserDataRepository userDataRepository;

    @GetMapping("/getAllComments/{postId}")
    public List<Comment> getAllComments(@PathVariable("postId") Integer postId){
        return commentService.findAllByPostId(postId);
    }

    @PostMapping("/createComment/{postId}")
    public String createCommentRequest(@RequestBody Comment comment,
                                       @PathVariable("postId") Integer postId,
                                       @RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient,
                                       @AuthenticationPrincipal OAuth2User oauth2User){
        UserData user = userDataRepository.findByLogin(oauth2User.getAttributes().get("email").toString());
        comment.setUserData(user);
        commentService.save(comment, postId);
        return "comment created";
    }
}
