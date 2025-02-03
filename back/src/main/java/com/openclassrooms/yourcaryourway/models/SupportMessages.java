package com.openclassrooms.yourcaryourway.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "supportmessages")
public class SupportMessages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "messageid", nullable = false)
    private Long id;

    @Column(name = "userid", nullable = false)
    private String userId;

    @Column(name = "reservationid", nullable = false)
    private String reservationId;

    @Column(nullable = false)
    private String content;

    @CreationTimestamp
    private LocalDateTime createdat;
}
