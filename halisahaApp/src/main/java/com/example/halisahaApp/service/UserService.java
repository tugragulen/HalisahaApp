package com.example.halisahaApp.service;

import com.example.halisahaApp.model.Match;
import com.example.halisahaApp.model.User;
import com.example.halisahaApp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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

    public Optional<User> findById(Long id) {
        return repository.findById(id);
    }
}
