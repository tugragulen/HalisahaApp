package com.example.halisahaApp.service;

import com.example.halisahaApp.model.LoginModel;
import com.example.halisahaApp.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final LoginRepository loginRepository;
    private final PasswordEncoder passwordEncoder;

    public void login(LoginModel loginModel) {
        String password = loginModel.getPassword();
        String encodedPassword = passwordEncoder.encode(password);
        loginModel.setPassword(encodedPassword);
        loginRepository.save(loginModel);
    }
}
