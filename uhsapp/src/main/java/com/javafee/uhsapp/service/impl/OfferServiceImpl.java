package com.javafee.uhsapp.service.impl;

import com.javafee.uhsapp.model.domain.Offer;
import com.javafee.uhsapp.service.OfferService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OfferServiceImpl implements OfferService {

    @Override
    public List<Offer> findAllByUserId(Integer userId) {
        return null;
    }

    @Override
    public void save(Offer offer, Integer userId) {
    }

    @Override
    public Offer getById(Integer offerId) {
        return null;
    }

    @Override
    public void delete(Offer offer, Integer offerId) {

    }

    @Override
    public List<Offer> findAllByUserIdAndOfferTitle(Integer userId, String offerTitle) {
        return null;
    }
}
