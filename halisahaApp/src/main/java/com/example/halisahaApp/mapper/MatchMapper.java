package com.example.halisahaApp.mapper;

import com.example.halisahaApp.dto.PlayerDto;
import com.example.halisahaApp.dto.request.CreateMatchRequest;
import com.example.halisahaApp.dto.response.MatchResponse;
import com.example.halisahaApp.model.Match;
import com.example.halisahaApp.model.MatchAdmin;
import com.example.halisahaApp.model.Participant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MatchMapper {
    MatchMapper INSTANCE = Mappers.getMapper(MatchMapper.class);

    Match toEntity(CreateMatchRequest request);

    @Mapping(target = "ownerUsername", source = "match.matchOwner.username")
    MatchResponse toResponse(Match match);

    default PlayerDto mapPlayer(Participant participant) {
        return PlayerMapper.INSTANCE.toDto(participant.getUser());
    }

    default String mapAdmin(MatchAdmin admin) {
        return admin.getUser().getUsername();
    }

}
