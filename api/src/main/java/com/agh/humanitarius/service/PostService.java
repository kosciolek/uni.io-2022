package com.agh.humanitarius.service;

import com.agh.humanitarius.model.domain.Post;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostService {

    Page<Post> findAllByUserId(Integer userId, Pageable pageable);

    void save(Post post, String login);

    Post getById(Integer postId);

    void delete(Integer postId);

    Page<Post> findAllByUserIdAndTitle(Integer userId, String postTitle, Pageable pageable);

    List<Post> findAll();

    Page<Post> findAll(Pageable pageable);
}
