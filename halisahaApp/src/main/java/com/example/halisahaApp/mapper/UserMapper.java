package com.example.halisahaApp.mapper;

import com.example.halisahaApp.dto.request.RegisterRequest;
import com.example.halisahaApp.dto.response.LoginResponse;
import com.example.halisahaApp.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    User toEntity(RegisterRequest request);

    @Mapping(target = "xPosition", source = "XPosition")
    @Mapping(target = "yPosition", source = "YPosition")
    LoginResponse toResponse(User user);
}
