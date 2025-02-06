package com.openclassrooms.yourcaryourway.services;

import com.openclassrooms.yourcaryourway.models.User;
import com.openclassrooms.yourcaryourway.models.User.Role;
import com.openclassrooms.yourcaryourway.repositories.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;
import lombok.Data;

@Data
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * Save a new user in Database
     *
     * @param userRegister - The User to save mapped as UserLogin
     * @return The User saved mapped as UserLogin
     * 
     */
    public User registerNewUser(User userRegister) {
        User existingUser = userRepository.findByEmail(userRegister.getEmail());
        if (existingUser != null) {
            throw new IllegalArgumentException("Email is already in use");
        }

        existingUser = userRepository.findByName(userRegister.getName());
        if (existingUser != null) {
            throw new IllegalArgumentException("Username is already in use");
        }

        if (userRegister.getPassword().length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters long");
        }

        User user = new User();
        user.setEmail(userRegister.getEmail());
        user.setName(userRegister.getName());
        user.setPassword(passwordEncoder.encode(userRegister.getPassword()));
        user.setRole(Role.CLIENT);
        userRepository.save(user);
        return user;
    }

    /**
     * Get the current connected user of the session
     *
     * @param emailOrName - The current username connected
     * @return User mapped as User
     *
     */
    public User getCurrentUser(String emailOrName) {
        User user = userRepository.findByEmail(emailOrName);
        if (user == null) {
            user = userRepository.findByName(emailOrName);
        }
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }

    /**
     * Update a user
     *
     * @param user - The User to update mapped as UserLogin
     * @param emailOrName - The current username connected
     * @return User updated and mapped as User
     * 
     */
    public User updateUser(User user, String emailOrName) {
        User currentUser = getCurrentUser(emailOrName);
        currentUser.setName(user.getName());
        currentUser.setEmail(user.getEmail());
        userRepository.save(currentUser);
        return currentUser;
    }

    public List<User> getUsersPerRole(Role role) {
        return userRepository.findByRole(role);
    }

}

