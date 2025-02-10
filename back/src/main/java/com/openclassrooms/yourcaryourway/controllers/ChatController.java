package com.openclassrooms.yourcaryourway.controllers;

import com.openclassrooms.yourcaryourway.models.ChatMessages;
import com.openclassrooms.yourcaryourway.repositories.ChatMessagesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
public class ChatController {

    @Autowired
    private ChatMessagesRepository chatMessageRepository;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/chat")
    public ChatMessages sendMessage(ChatMessages message) {
        System.out.println("Message reçu : " + message.getContent());
        message.setCreatedAt(LocalDateTime.now());
        chatMessageRepository.save(message);
        return message;
    }
}
