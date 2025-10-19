package com.example.halisahaApp.service;

import com.example.halisahaApp.dto.request.LoginRequest;
import com.example.halisahaApp.dto.request.RegisterRequest;
import com.example.halisahaApp.dto.response.LoginResponse;
import com.example.halisahaApp.mapper.UserMapper;
import com.example.halisahaApp.dto.MailDto;
import com.example.halisahaApp.model.User;
import com.example.halisahaApp.repository.UserRepository;
import com.example.halisahaApp.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;

    public void signUp(RegisterRequest request) {
        User entity = UserMapper.INSTANCE.toEntity(request);
        String password = entity.getPassword();
        String encodedPassword = passwordEncoder.encode(password);
        entity.setPassword(encodedPassword);
        entity.setVerificationToken(UUID.randomUUID().toString());
        userRepository.save(entity);
        mailService.sendMail(createMail(entity));
    }

    public Optional<User> verify(String token) {
        return userRepository.findByVerificationToken(token)
                .map(record -> {
                    record.setVerified(true);
                    userRepository.save(record);
                    return record;
                });
    }

    private MailDto createMail(User entity) {
        MailDto mail = new MailDto();
        mail.setTo(entity.getEmail());
        mail.setSubject("Halisaha App Doğrulama");
        String link = "http://localhost:8080/api/auth/verify?token=" + entity.getVerificationToken();
        mail.setText("Merhaba, hesabınızı doğrulamak için linke tıklayınız, " + link);
        return mail;
    }

    public LoginResponse login(LoginRequest request) {
        User userRecord = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new UnsupportedOperationException("User not found with username: " + request.getUsername()));
        if (!userRecord.isVerified()) {
            throw new UnsupportedOperationException("User is not verified");
        }
        if (!checkPassword(userRecord, request.getPassword())) {
            throw new UnsupportedOperationException("Wrong password");
        }
        String token = JWTUtil.generateToken(request.getUsername());
        return LoginResponse.builder()
                .id(userRecord.getId())
                .username(userRecord.getUsername())
                .token(token)
                .role(userRecord.getRole())
                .xPosition(userRecord.getXPosition())
                .yPosition(userRecord.getYPosition())
                .build();
    }

    private boolean checkPassword(User userRecord, String password) {
        return passwordEncoder.matches(password, userRecord.getPassword());
    }
}
