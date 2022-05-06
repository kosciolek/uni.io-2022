package com.javafee.uhsapp.model.repository;

import com.javafee.uhsapp.model.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByPost_Id(Integer postId);
}
