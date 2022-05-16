package com.agh.humanitarius.service.impl;

import com.agh.humanitarius.model.domain.Post;
import com.agh.humanitarius.model.repository.PostRepository;
import com.agh.humanitarius.model.repository.UserDataRepository;
import com.agh.humanitarius.service.PostService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserDataRepository userDataRepository;

    @Override
    public Page<Post> findAllByUserId(Integer userId, Pageable pageable) {
        return postRepository.findAllByUserData_Id(userId, pageable);
    }


    @Override
    public void save(Post post, String login) {
        post.setUserData((userDataRepository.findByLogin(login)));
        postRepository.save(
                Post.builder()
                        .userData(post.getUserData())
                        .category(post.getCategory())
                        .creationDate(new Timestamp(System.currentTimeMillis()))
                        .type(post.getType())
                        .description(post.getDescription())
                        .shortDescription(post.getShortDescription())
                        .address(post.getAddress())
                        .author(post.getUserData().getName())
                        .email(post.getUserData().getLogin())
                        .endDate(post.getEndDate())
                        .finished(false)
                        .phoneNumber(post.getPhoneNumber())
                        .title(post.getTitle())
                        .build());
    }

    @Override
    public Post getById(Integer postId) {
        return postRepository.getById(postId);
    }

    @Override
    public void delete(Integer postId) {
        postRepository.deleteById(postId);
    }

    @Override
    public Page<Post> findAllByUserIdAndTitle(Integer userId, String postTitle, Pageable pageable) {
        return postRepository.findAllByUserData_IdAndTitleContains(userId, postTitle, pageable);
    }

    @Override
    public List<Post> findAll(){
        return postRepository.findAll();
    }

    @Override
    public Page<Post> findAll(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

}
