package com.openclassrooms.yourcaryourway.dto;

import lombok.Data;

@Data
public class LoginDTO {
    private String emailOrName;
    private String password;
}