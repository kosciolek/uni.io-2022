package com.javafee.uhsapp.service;

import com.javafee.uhsapp.model.domain.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> findAllByPostId(Integer postId);

    void save(Comment comment, Integer postId);
}
