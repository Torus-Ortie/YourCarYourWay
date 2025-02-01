package com.openclassrooms.yourcaryourway.dto;

import com.openclassrooms.yourcaryourway.models.User.Role;

import lombok.Data;

@Data
public class UserDTO {
    private String email;
    private Role role;
    private String firstName;
}
