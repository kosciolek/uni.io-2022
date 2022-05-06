package com.javafee.uhsapp.service;

import com.javafee.uhsapp.model.domain.Post;

import java.util.List;

public interface PostService {

    List<Post> findAllByUserId(Integer userId);

    void save(Post post, String login);

    Post getById(Integer postId);

    void delete(Integer postId);

    List<Post> findAllByUserIdAndTitle(Integer userId, String postTitle);

    List<Post> findAll();
}
