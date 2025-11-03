package com.example.halisahaApp.dto.request;

import com.example.halisahaApp.dto.PositionDto;
import com.example.halisahaApp.model.enums.MatchVisibility;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
public class CreateMatchRequest {
    private String name;
    private LocalDate date;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime time;
    private String location;
    private String format;
    private MatchVisibility visibility;
    private String ownerUsername;
    private List<PositionDto> positions;
}
