package com.javafee.uhsapp.model.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.javafee.uhsapp.model.domain.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {
//	List<Post> findAllByUserData_Id(Integer userId);

//	List<Post> findAllByUserData_IdAndTitleContains(Integer userId, String postTitle);

	Page<Post> findAllByUserData_Id(Integer userId, Pageable pageable);

	Page<Post> findAllByUserData_IdAndTitleContains(Integer userId, String postTile, Pageable pageable);
}
