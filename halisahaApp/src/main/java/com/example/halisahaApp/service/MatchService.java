package com.example.halisahaApp.service;

import com.example.halisahaApp.dto.PositionDto;
import com.example.halisahaApp.dto.request.CreateMatchRequest;
import com.example.halisahaApp.dto.response.MatchResponse;
import com.example.halisahaApp.mapper.MatchMapper;
import com.example.halisahaApp.model.FieldPosition;
import com.example.halisahaApp.model.Match;
import com.example.halisahaApp.model.User;
import com.example.halisahaApp.repository.MatchRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MatchService {
    private final MatchRepository matchRepository;
    private final UserService userService;
    private final ParticipantService participantService;
    private final FieldPositionService fieldPositionService;

    @Transactional
    public void createMatch(CreateMatchRequest request) {
        Match matchEntity = MatchMapper.INSTANCE.toEntity(request);
        matchRepository.save(matchEntity);
        assignOwner(request.getOwnerUsername(), matchEntity);
        assignPositions(request.getPositions(), matchEntity);
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

    private void assignOwner(String ownerUsername, Match match) {
        User owner = userService.findByUsername(ownerUsername).orElseThrow(
                () -> new RuntimeException("User not found")
        );
        match.setMatchOwner(owner);
        owner.getOwneredMatches().add(match);
    }

    private void assignPositions(List<PositionDto> positions, Match match) {
        List<FieldPosition> positionList = new ArrayList<>();
        for (PositionDto position : positions) {
            FieldPosition entity = MatchMapper.INSTANCE.toPosition(position);
            entity.setMatch(match);
            participantService.findByUserIdAndMatchId(position.getUserId(), match.getId())
                    .ifPresent(participant -> {
                        entity.setParticipant(participant);
                        participant.setPosition(entity);
                    });
            positionList.add(entity);
        }
        fieldPositionService.saveAll(positionList);
        match.setPositions(positionList);
    }
}
