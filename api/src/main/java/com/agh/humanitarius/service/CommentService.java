package com.agh.humanitarius.service;

import com.agh.humanitarius.model.domain.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> findAllByPostId(Integer postId);

    void save(Comment comment, Integer postId);
}
