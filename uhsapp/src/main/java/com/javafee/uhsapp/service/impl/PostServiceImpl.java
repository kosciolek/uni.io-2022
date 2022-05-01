package com.javafee.uhsapp.service.impl;

import com.javafee.uhsapp.model.domain.Post;
import com.javafee.uhsapp.model.repository.PostRepository;
import com.javafee.uhsapp.model.repository.UserDataRepository;
import com.javafee.uhsapp.service.PostService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.GregorianCalendar;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserDataRepository userDataRepository;

    @Override
    public List<Post> findAllByUserId(Integer userId) {
        return postRepository.findAllByUserData_Id(userId);
    }

    @Override
    public void save(Post post, Integer userId) {
        post.setUserData(userDataRepository.getById(userId));
        postRepository.save(
                Post.builder()
                        .category(post.getCategory())
                        .description(post.getDescription())
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
    public List<Post> findAllByUserIdAndTitle(Integer userId, String postTitle) {
        return postRepository.findAllByUserData_IdAndTitleContains(userId, postTitle);
    }
}
