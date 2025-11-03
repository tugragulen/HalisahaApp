package com.example.halisahaApp.service;

import com.example.halisahaApp.model.Participant;
import com.example.halisahaApp.repository.ParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ParticipantService {
    private final ParticipantRepository repository;

    public Optional<Participant> findByUserIdAndMatchId(Long userId, Long matchId) {
        return repository.findByUserIdAndMatchId(userId, matchId);
    }
}
