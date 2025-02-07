package com.openclassrooms.yourcaryourway.repositories;

import com.openclassrooms.yourcaryourway.models.ChatMessages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessagesRepository extends JpaRepository<ChatMessages, Long> {}
