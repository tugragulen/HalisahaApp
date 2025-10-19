package com.example.halisahaApp.mapper;

import com.example.halisahaApp.dto.request.RegisterRequest;
import com.example.halisahaApp.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    User toEntity(RegisterRequest request);
}
