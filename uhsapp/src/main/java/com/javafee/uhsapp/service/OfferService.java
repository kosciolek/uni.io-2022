package com.javafee.uhsapp.service;

import com.javafee.uhsapp.model.domain.Offer;

import java.util.List;

public interface OfferService {

    List<Offer> findAllByUserId(Integer userId);

    void save(Offer offer, Integer userId);

    Offer getById(Integer offerId);

    void delete(Offer offer, Integer offerId);

    List<Offer> findAllByUserIdAndOfferTitle(Integer userId, String offerTitle);

}
