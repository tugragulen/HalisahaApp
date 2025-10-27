package com.example.halisahaApp.service;

import com.example.halisahaApp.dto.request.CreateMatchRequest;
import com.example.halisahaApp.dto.response.MatchResponse;
import com.example.halisahaApp.mapper.MatchMapper;
import com.example.halisahaApp.model.Match;
import com.example.halisahaApp.repository.MatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public MatchResponse findMatchById(Long id) {
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new UnsupportedOperationException("Match not found"));
        return MatchMapper.INSTANCE.toResponse(match);
    }

    public Optional<Match> findById(Long id) {
        return matchRepository.findById(id);
    }
}
