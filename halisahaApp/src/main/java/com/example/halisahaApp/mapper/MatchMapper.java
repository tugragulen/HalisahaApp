package com.example.halisahaApp.mapper;

import com.example.halisahaApp.dto.PlayerDto;
import com.example.halisahaApp.dto.PositionDto;
import com.example.halisahaApp.dto.request.CreateMatchRequest;
import com.example.halisahaApp.dto.response.MatchResponse;
import com.example.halisahaApp.model.*;
import com.example.halisahaApp.model.enums.MatchFormat;
import com.example.halisahaApp.service.UserService;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MatchMapper {
    MatchMapper INSTANCE = Mappers.getMapper(MatchMapper.class);

    @Mapping(target = "matchOwner", ignore = true)
    @Mapping(target = "positions", ignore = true)
    Match toEntity(CreateMatchRequest request);

    @Mapping(target = "ownerUsername", source = "match.matchOwner.username")
    @Mapping(target = "format", source = "match.format.label")
    MatchResponse toResponse(Match match, UserService userService);

    @AfterMapping
    default void afterMapping(@MappingTarget MatchResponse response, Match match, UserService userService) {
        response.setPositions(
                match.getPositions()
                        .stream()
                        .map(fieldPosition -> {
                                    User player = null;
                                    if (fieldPosition.getParticipant() != null) {
                                        player = userService.findById(fieldPosition.getParticipant().getUser().getId())
                                                .orElse(null);
                                    }
                                    return toPositionDto(fieldPosition, PlayerMapper.INSTANCE.toDto(player));
                                }
                        )
                        .toList()
        );
    }

    default PlayerDto mapPlayer(Participant participant) {
        return PlayerMapper.INSTANCE.toDto(participant.getUser());
    }

    default String mapAdmin(MatchAdmin admin) {
        return admin.getUser().getUsername();
    }

    default MatchFormat mapFormat(String format) {
        return MatchFormat.fromLabel(format);
    }

    @Mapping(target = "id", ignore = true)
    FieldPosition toPosition(PositionDto dto);

    @Mapping(target = "id", source = "position.id")
    PositionDto toPositionDto(FieldPosition position, PlayerDto player);

}
