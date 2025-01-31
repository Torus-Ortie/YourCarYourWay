package com.openclassrooms.yourcaryourway.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import com.openclassrooms.yourcaryourway.models.SupportMessages;

@Controller
public class MessageController {
    @MessageMapping("/message") // Quand un client envoie un message à /app/message
    @SendTo("/topic/messages") // Tous les abonnés reçoivent la réponse sur /topic/messages
    public SupportMessages sendMessage(SupportMessages message) {
        return new SupportMessages(HtmlUtils.htmlEscape(message.getUserId()), message.getContent());
    }
}
