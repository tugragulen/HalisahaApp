package com.example.halisahaApp.service;

import com.example.halisahaApp.model.LoginModel;
import com.example.halisahaApp.model.MailModel;
import com.example.halisahaApp.model.SignUpModel;
import com.example.halisahaApp.model.User;
import com.example.halisahaApp.model.enums.RoleEnum;
import com.example.halisahaApp.repository.SignUpRepository;
import com.example.halisahaApp.response.LoginResponse;
import com.example.halisahaApp.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final SignUpRepository signUpRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;

    public void signUp(SignUpModel signUpModel) {
        String password = signUpModel.getPassword();
        String encodedPassword = passwordEncoder.encode(password);
        signUpModel.setPassword(encodedPassword);
        signUpModel.setToken(UUID.randomUUID().toString());
        signUpModel.setUser(createUser());
        signUpRepository.save(signUpModel);
        mailService.sendMail(createMail(signUpModel));
    }

    public Optional<SignUpModel> verify(String token) {
        return signUpRepository.findByToken(token)
                .map(record -> {
                    record.setVerified(true);
                    signUpRepository.save(record);
                    return record;
                });
    }

    private MailModel createMail(SignUpModel signUpModel) {
        MailModel mail = new MailModel();
        mail.setTo(signUpModel.getEmail());
        mail.setSubject("Halisaha App Doğrulama");
        String link = "http://localhost:8080/api/auth/verify?token=" + signUpModel.getToken();
        mail.setText("Merhaba, hesabınızı doğrulamak için linke tıklayınız, " + link);
        return mail;
    }

    public LoginResponse login(LoginModel loginModel) {
        SignUpModel userRecord = signUpRepository.findByUsername(loginModel.getUsername())
                .orElseThrow(() -> new UnsupportedOperationException("User not found with username: " + loginModel.getUsername()));
        if (!userRecord.isVerified()) {
            throw new UnsupportedOperationException("User is not verified");
        }
        if (!checkPassword(userRecord, loginModel.getPassword())) {
            throw new UnsupportedOperationException("Wrong password");
        }
        String token = JWTUtil.generateToken(loginModel.getUsername());
        return LoginResponse.builder()
                .id(userRecord.getId())
                .username(userRecord.getUsername())
                .token(token)
                .role(userRecord.getUser().getRole())
                .xPosition(userRecord.getUser().getXPosition())
                .yPosition(userRecord.getUser().getYPosition())
                .build();
    }

    private boolean checkPassword(SignUpModel userRecord, String password) {
        return passwordEncoder.matches(password, userRecord.getPassword());
    }

    private User createUser() {
        User user = new User();
        user.setRole(RoleEnum.ROLE_USER);
        return user;
    }
}
