package com.openclassrooms.yourcaryourway.dto;

import com.openclassrooms.yourcaryourway.models.User.Role;

import lombok.Data;

@Data
public class UserDTO {
    private String name;
    private String email;
    private Role role;
}
