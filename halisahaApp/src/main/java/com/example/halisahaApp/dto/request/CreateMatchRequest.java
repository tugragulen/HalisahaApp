package com.example.halisahaApp.dto.request;

import com.example.halisahaApp.model.enums.MatchVisibility;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

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
}
