package com.openclassrooms.yourcaryourway.repositories;

import com.openclassrooms.yourcaryourway.models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @NonNull
    Optional<User> findById(@NonNull Long id);

    User findByEmail(String email);

    User findByRole(String role);
}
