package com.example.halisahaApp.controller;

import com.example.halisahaApp.model.LoginModel;
import com.example.halisahaApp.model.SignUpModel;
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
    public ResponseEntity<?> signUp(@RequestBody SignUpModel signUpModel) {
        authService.signUp(signUpModel);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verify(@RequestParam String token) {
        Optional<SignUpModel> verified = authService.verify(token);
        if (verified.isPresent()) {
            return ResponseEntity.ok("Email verified");
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginModel loginModel) {
        return ResponseEntity.ok(authService.login(loginModel));
    }

}
