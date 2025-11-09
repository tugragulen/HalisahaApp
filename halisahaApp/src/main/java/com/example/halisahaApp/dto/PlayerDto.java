package com.example.halisahaApp.dto;

import com.example.halisahaApp.model.enums.TeamSide;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlayerDto {
    private Long id;
    private String username;
    private double xPosition;
    private double yPosition;
    private TeamSide team;
}
