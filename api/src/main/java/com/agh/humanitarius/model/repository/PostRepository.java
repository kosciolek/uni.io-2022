package com.agh.humanitarius.model.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.agh.humanitarius.model.domain.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {
//	List<Post> findAllByUserData_Id(Integer userId);

//	List<Post> findAllByUserData_IdAndTitleContains(Integer userId, String postTitle);

	Page<Post> findAll(Pageable pageable);

	Page<Post> findAllByUserData_Id(Integer userId, Pageable pageable);

	Page<Post> findAllByUserData_IdAndTitleContains(Integer userId, String postTile, Pageable pageable);
}
