package com.openclassrooms.yourcaryourway.services;

import com.openclassrooms.yourcaryourway.models.ChatMessages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void sendMessageToUser(String userId, ChatMessages message) {
        messagingTemplate.convertAndSendToUser(userId, "/queue/messages", message);
    }
}
