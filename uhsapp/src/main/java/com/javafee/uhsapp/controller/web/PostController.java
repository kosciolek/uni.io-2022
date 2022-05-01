package com.javafee.uhsapp.controller.web;

import com.javafee.uhsapp.model.domain.Post;
import com.javafee.uhsapp.model.domain.UserData;
import com.javafee.uhsapp.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/offer")
@RequiredArgsConstructor
public class PostController {
    private final PostService offerService;

    @PostMapping("/save")
    public String save(@RequestBody Post post){
        offerService.save(post, ((UserData) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());
        // TODO: handle redirect or sth
        return "Offer added @146";
    }
}
