package com.example.halisahaApp.dto.response;

import com.example.halisahaApp.dto.PlayerDto;
import com.example.halisahaApp.model.enums.MatchFormat;
import com.example.halisahaApp.model.enums.MatchVisibility;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class MatchResponse {
    private Long id;
    private String name;
    private Date matchDate;
    private String location;
    private MatchFormat format;
    private MatchVisibility visibility;
    private List<PlayerDto> players;
    private List<String> admins;
    private String ownerUsername;
}