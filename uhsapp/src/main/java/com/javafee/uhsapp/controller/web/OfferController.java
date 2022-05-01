package com.javafee.uhsapp.controller.web;

import com.javafee.uhsapp.model.domain.Offer;
import com.javafee.uhsapp.model.domain.UserData;
import com.javafee.uhsapp.service.OfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/offer")
@RequiredArgsConstructor
public class OfferController {
    private final OfferService offerService;

    @PostMapping("/save")
    public String save(@RequestBody Offer offer){
        offerService.save(offer, ((UserData) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());
        // TODO: handle redirect or sth
        return "Offer added @146";
    }

}
