package com.openclassrooms.yourcaryourway.controllers;

import com.openclassrooms.yourcaryourway.dto.LoginDTO;
import com.openclassrooms.yourcaryourway.dto.RegisterDTO;
import com.openclassrooms.yourcaryourway.dto.TokenResponseDTO;
import com.openclassrooms.yourcaryourway.dto.UserDTO;
import com.openclassrooms.yourcaryourway.models.User;
import com.openclassrooms.yourcaryourway.models.User.Role;
import com.openclassrooms.yourcaryourway.services.JWTService;
import com.openclassrooms.yourcaryourway.services.UserService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/")
    public String home() {
        return "API is running. Please access the API endpoints directly.";
    }

    @GetMapping("/me")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserDTO> getCurrentUser(Authentication authentication) {
        String emailOrName = authentication.getName();
        User user = userService.getCurrentUser(emailOrName);
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/me")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO updateUser(@RequestBody UserDTO userDTO, Authentication authentication) {
        String emailOrName = authentication.getName();
        return modelMapper.map(userService.updateUser(modelMapper.map(userDTO, User.class), emailOrName), UserDTO.class);
    }

    @GetMapping("/role/{role}")
    public List<UserDTO> getUsersPerRole(Role role) {
        return userService.getUsersPerRole(role)
            .stream()
            .map(user -> modelMapper.map(user, UserDTO.class))
            .collect(Collectors.toList());
    }

    @GetMapping("/all")
    public List<UserDTO> getUsers() {
        return userService.getUsers()
            .stream()
            .map(user -> modelMapper.map(user, UserDTO.class))
            .collect(Collectors.toList());
    }

    @PostMapping("/auth/register")
	@ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
	public ResponseEntity<TokenResponseDTO> getRegistreted(@RequestBody RegisterDTO userRegisterDTO) {
		userService.registerNewUser(modelMapper.map(userRegisterDTO, User.class));
		Authentication authentication = new UsernamePasswordAuthenticationToken(userRegisterDTO.getEmail(), userRegisterDTO.getPassword());
		String emailOrName = authentication.getName();
        String token = jwtService.generateToken(emailOrName);
		TokenResponseDTO tokenResponseDTO = modelMapper.map(
            Collections.singletonMap("token", token),
            TokenResponseDTO.class
        );
        return ResponseEntity.ok(tokenResponseDTO);
	}

    @PostMapping("/auth/login")
	@ResponseStatus(HttpStatus.OK)
    @ResponseBody
	public ResponseEntity<TokenResponseDTO> getToken(@RequestBody LoginDTO userLoginDTO) {
		Authentication authentication = new UsernamePasswordAuthenticationToken(userLoginDTO.getEmailOrName(), userLoginDTO.getPassword());
		String email = authentication.getName();
		String token = jwtService.generateToken(email);
		TokenResponseDTO tokenResponseDTO = modelMapper.map(
            Collections.singletonMap("token", token),
            TokenResponseDTO.class
        );
		return ResponseEntity.ok(tokenResponseDTO);
	}
}
