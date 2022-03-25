package com.javafee.uhsapp.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javafee.uhsapp.model.domain.Test;

public interface TestRepository extends JpaRepository<Test, Integer> {
}
