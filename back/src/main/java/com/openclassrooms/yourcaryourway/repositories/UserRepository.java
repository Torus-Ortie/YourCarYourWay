package com.openclassrooms.yourcaryourway.repositories;

import com.openclassrooms.yourcaryourway.models.User;
import com.openclassrooms.yourcaryourway.models.User.Role;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.lang.NonNull;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @NonNull
    Optional<User> findById(@NonNull Long id);

    User findByEmail(String email);
    User findByName(String name);
    List<User> findByRole(Role role);
}
