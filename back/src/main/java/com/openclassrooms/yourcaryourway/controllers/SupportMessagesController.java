package com.openclassrooms.yourcaryourway.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import com.openclassrooms.yourcaryourway.models.SupportMessages;

@RestController
@RequestMapping("/api")
public class SupportMessagesController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat")
    public void sendMessage(@Payload SupportMessages message, SimpMessageHeaderAccessor headerAccessor) {
        @SuppressWarnings("null")
        String sender = headerAccessor.getUser().getName();
        message.setUserId(sender);

        String destination = "/user/" + message.getUserId() + "/queue/messages";
        messagingTemplate.convertAndSend(destination, message);
    }
}
