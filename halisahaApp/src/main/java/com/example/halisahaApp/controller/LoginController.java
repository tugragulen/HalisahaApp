package com.example.halisahaApp.controller;

import com.example.halisahaApp.model.LoginModel;
import com.example.halisahaApp.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/login")
@CrossOrigin("*")
@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;

    @PostMapping
    public ResponseEntity<?> signUp(@RequestBody LoginModel loginModel) {
        loginService.login(loginModel);
        return ResponseEntity.ok().build();
    }
}
