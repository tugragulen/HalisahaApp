package com.example.halisahaApp.controller;

import com.example.halisahaApp.dto.request.LoginRequest;
import com.example.halisahaApp.dto.request.RegisterRequest;
import com.example.halisahaApp.model.User;
import com.example.halisahaApp.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/auth")
@CrossOrigin("*")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody RegisterRequest request) {
        authService.signUp(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verify(@RequestParam String token) {
        Optional<User> verified = authService.verify(token);
        if (verified.isPresent()) {
            return ResponseEntity.ok("Email verified");
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

}
