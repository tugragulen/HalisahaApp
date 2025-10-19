package com.example.halisahaApp.mapper;

import com.example.halisahaApp.dto.PlayerDto;
import com.example.halisahaApp.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PlayerMapper {
    PlayerMapper INSTANCE = Mappers.getMapper(PlayerMapper.class);

    PlayerDto toDto(User user);
}