package com.example.halisahaApp.response;

import com.example.halisahaApp.model.enums.RoleEnum;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginResponse {
    private Long id;
    private String username;
    private String token;
    private RoleEnum role;
    private double xPosition;
    private double yPosition;
}
