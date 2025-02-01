package com.openclassrooms.yourcaryourway.services;

import com.openclassrooms.yourcaryourway.models.User;
import com.openclassrooms.yourcaryourway.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {;

    @Autowired
    private UserRepository userRepository;

    /**
     * Get the list of all users having a specific role 
     *
     * @param role - The role expected
     * @return A list of User
     *
     */
    public List<User> getUsersPerRole(String role) {
        return userRepository.findByRole(role);
    }

    /**
     * Get the current connected user of the session
     *
     * @param email - The current username connected
     * @return User mapped as User
     *
     */
    public User getCurrentUser(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }
}

