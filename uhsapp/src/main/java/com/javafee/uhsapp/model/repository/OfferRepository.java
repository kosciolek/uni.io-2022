package com.javafee.uhsapp.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javafee.uhsapp.model.domain.Offer;

public interface OfferRepository extends JpaRepository<Offer, Integer> {
	List<Offer> findAllByUserData_Id(Integer userId);

}
