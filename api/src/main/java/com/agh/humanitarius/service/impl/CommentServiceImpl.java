package com.agh.humanitarius.service.impl;

import com.agh.humanitarius.service.CommentService;
import com.agh.humanitarius.model.domain.Comment;
import com.agh.humanitarius.model.repository.CommentRepository;
import com.agh.humanitarius.model.repository.PostRepository;
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
