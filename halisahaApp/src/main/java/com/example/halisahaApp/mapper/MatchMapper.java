package com.example.halisahaApp.mapper;

import com.example.halisahaApp.dto.request.CreateMatchRequest;
import com.example.halisahaApp.model.Match;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MatchMapper {
    MatchMapper INSTANCE = Mappers.getMapper(MatchMapper.class);

    Match toEntity(CreateMatchRequest request);
}
