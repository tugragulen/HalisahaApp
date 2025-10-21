package com.example.halisahaApp.service;

import com.example.halisahaApp.dto.response.LoginResponse;
import com.example.halisahaApp.mapper.UserMapper;
import com.example.halisahaApp.model.Match;
import com.example.halisahaApp.model.User;
import com.example.halisahaApp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;

    public Optional<User> findByUsername(String username) {
        return repository.findByUsername(username);
    }

    public void ownMatch(User model, Match match) {
        model.getOwneredMatches().add(match);
        repository.save(model);
    }

    public LoginResponse getUser(Authentication authentication) {
        String username = authentication.getName();
        Optional<User> optUser = findByUsername(username);
        if (optUser.isPresent()) {
            User user = optUser.get();
            return UserMapper.INSTANCE.toResponse(user);
        }
        throw new UnsupportedOperationException("User not found");
    }

    public Optional<User> findById(Long id) {
        return repository.findById(id);
    }
}
