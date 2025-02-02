package com.openclassrooms.yourcaryourway.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.HtmlUtils;

import com.openclassrooms.yourcaryourway.models.SupportMessages;
import com.openclassrooms.yourcaryourway.services.SupportMessagesService;

@RestController
@RequestMapping("/api")
public class SupportMessagesController {

    @Autowired
    private SupportMessagesService supportmessagesservice;

    @MessageMapping("/message") // Quand un client envoie un message à /api/message
    public void sendMessage(SupportMessages supportmessages) {
        supportmessagesservice.sendSupportMessage(supportmessages.getReservationId(), supportmessages);
    }
}
