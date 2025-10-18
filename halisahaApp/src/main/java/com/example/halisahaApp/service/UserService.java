package com.example.halisahaApp.service;

import com.example.halisahaApp.model.Match;
import com.example.halisahaApp.model.SignUpModel;
import com.example.halisahaApp.repository.SignUpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final SignUpRepository repository;

    public Optional<SignUpModel> findByUsername(String username) {
        return repository.findByUsername(username);
    }

    public void ownMatch(SignUpModel model, Match match) {
        model.getUser().getOwneredMatches().add(match);
        repository.save(model);
    }
}
