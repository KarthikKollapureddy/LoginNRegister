package com.example.userservice.controller;

import com.example.userservice.dao.UserRepository;
import com.example.userservice.model.AuthRequest;
import com.example.userservice.model.User;
import com.example.userservice.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("user")
public class WelcomeController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/")
    public String welcome(){
        return "Welcome to JWT TOken";
    }
    @GetMapping("/test")
    public String welcomeTest() {
        return "Welcome to JWT TOKENS !!";
    }

    @Autowired
    UserRepository userRepository;


    @GetMapping("na/testnew")
    public String welcomeTestNew() {
        return "Welcome to JWT TOKENS !!";
    }


    @PostMapping("na/signup")
    public User signup(@RequestBody User user){
        return userRepository.save(user);
    }

    @PostMapping("na/login")
    public String generateToken(@RequestBody AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
        } catch (Exception ex) {
            throw new Exception("invalid username/password");
        }
        return jwtUtil.generateToken(authRequest.getEmail());
    }
}
