package com.openclassrooms.yourcaryourway.configuration;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;

import com.openclassrooms.yourcaryourway.services.JWTService;

@Component
public class JwtChannelInterceptor implements ChannelInterceptor {

    private final JWTService jwtService;

    public JwtChannelInterceptor(JWTService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public Message<?> preSend(@SuppressWarnings("null") Message<?> message, @SuppressWarnings("null") MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        String authHeader = accessor.getFirstNativeHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                String username = jwtService.extractUsername(token);
                accessor.setUser(() -> username); 
            } catch (Exception e) {
                throw new RuntimeException("Invalid WebSocket connection: " + e.getMessage());
            }
        }

        return message;
    }
}
