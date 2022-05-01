package com.javafee.uhsapp.service.impl;

import com.javafee.uhsapp.model.domain.Offer;
import com.javafee.uhsapp.model.domain.UserData;
import com.javafee.uhsapp.model.repository.OfferRepository;
import com.javafee.uhsapp.model.repository.UserDataRepository;
import com.javafee.uhsapp.service.OfferService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.GregorianCalendar;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OfferServiceImpl implements OfferService {

    private final OfferRepository offerRepository;
    private final UserDataRepository userDataRepository;

    @Override
    public List<Offer> findAllByUserId(Integer userId) {
        return offerRepository.findAllByUserData_Id(userId);
    }

    @Override
    public void save(Offer offer, Integer userId) {
        offer.setUserData(userDataRepository.getById(userId));
        offerRepository.save(
                Offer.builder()
                        .category(offer.getCategory())
                        .description(offer.getDescription())
                        .email(offer.getUserData().getLogin())
                        .startDate(offer.getStartDate())
                        .endDate(offer.getEndDate())
                        .finished(false)
                        .issuanceDate(String.valueOf(new GregorianCalendar().getTime()))
                        .needy(offer.isNeedy())
                        .phoneNumber(offer.getPhoneNumber())
                        .title(offer.getTitle())
                        .build());
    }

    @Override
    public Offer getById(Integer offerId) {
        return offerRepository.getById(offerId);
    }

    @Override
    public void delete(Integer offerId) {
        offerRepository.deleteById(offerId);
    }

    @Override
    public List<Offer> findAllByUserIdAndTitle(Integer userId, String offerTitle) {
        return offerRepository.findAllByUserData_IdAndTitleContains(userId, offerTitle);
    }
}
