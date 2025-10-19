package com.example.halisahaApp.service;

import com.example.halisahaApp.dto.request.CreateMatchRequest;
import com.example.halisahaApp.dto.response.MatchResponse;
import com.example.halisahaApp.mapper.MatchMapper;
import com.example.halisahaApp.model.Match;
import com.example.halisahaApp.repository.MatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MatchService {
    private final MatchRepository matchRepository;
    private final UserService userService;

    public void createMatch(CreateMatchRequest request) {
        Match matchEntity = MatchMapper.INSTANCE.toEntity(request);
        matchRepository.save(matchEntity);

        userService.findByUsername(request.getOwnerUsername())
                .ifPresent(entity -> {
                    matchEntity.setMatchOwner(entity);
                    userService.ownMatch(entity, matchEntity);
                });
    }

    public List<MatchResponse> findAll(Long userId) {
        return matchRepository.findAllByUser(userId)
                .stream()
                .map(MatchMapper.INSTANCE::toResponse)
                .toList();
    }
}
