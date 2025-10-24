package com.example.halisahaApp.dto.response;

import com.example.halisahaApp.dto.PlayerDto;
import com.example.halisahaApp.model.enums.MatchVisibility;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
public class MatchResponse {
    private Long id;
    private String name;
    private LocalDate date;
    private LocalTime time;
    private String location;
    private String format;
    private MatchVisibility visibility;
    private List<PlayerDto> players;
    private List<String> admins;
    private String ownerUsername;
}