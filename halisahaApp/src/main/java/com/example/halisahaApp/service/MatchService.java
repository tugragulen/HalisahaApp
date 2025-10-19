package com.example.halisahaApp.service;

import com.example.halisahaApp.dto.request.CreateMatchRequest;
import com.example.halisahaApp.mapper.MatchMapper;
import com.example.halisahaApp.model.Match;
import com.example.halisahaApp.repository.MatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MatchService {
    private final MatchRepository matchRepository;
    private final UserService userService;

    public void createMatch(CreateMatchRequest request) {
        Match matchEntity = MatchMapper.INSTANCE.toEntity(request);
        userService.findByUsername(request.getOwnerUsername())
                .ifPresent(entity -> {
                    matchEntity.setMatchOwner(entity);
                    userService.ownMatch(entity, matchEntity);
                });
        matchRepository.save(matchEntity);
    }
}
