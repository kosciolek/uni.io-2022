package com.javafee.uhsapp.service.impl;

import com.javafee.uhsapp.model.domain.Comment;
import com.javafee.uhsapp.model.repository.CommentRepository;
import com.javafee.uhsapp.model.repository.PostRepository;
import com.javafee.uhsapp.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    @Override
    public List<Comment> findAllByPostId(Integer postId) {
        return commentRepository.findByPost_Id(postId);
    }

    @Override
    public void save(Comment comment, Integer postId) {
        comment.setPost(postRepository.getById(postId));
        commentRepository.save(
                Comment.builder()
                        .userData(comment.getUserData())
                        .post(comment.getPost())
                        .author(comment.getUserData().getName())
                        .body(comment.getBody())
                        .date(new Timestamp(System.currentTimeMillis()))
                        .build());
    }
}
