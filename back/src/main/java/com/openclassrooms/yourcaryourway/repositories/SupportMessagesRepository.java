package com.openclassrooms.yourcaryourway.repositories;

import com.openclassrooms.yourcaryourway.models.SupportMessages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupportMessagesRepository extends JpaRepository<SupportMessages, Long> {}
