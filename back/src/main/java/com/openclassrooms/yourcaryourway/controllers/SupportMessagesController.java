package com.openclassrooms.yourcaryourway.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import com.openclassrooms.yourcaryourway.models.SupportMessages;
import com.openclassrooms.yourcaryourway.services.SupportMessagesService;

@RestController
@RequestMapping("/api")
public class SupportMessagesController {

    @Autowired
    private SupportMessagesService supportmessagesservice;

    @MessageMapping("/message")
    public void sendMessage(SupportMessages supportmessages) {
        supportmessagesservice.sendMessageToUser(supportmessages.getReservationId(), supportmessages);
    }
}
