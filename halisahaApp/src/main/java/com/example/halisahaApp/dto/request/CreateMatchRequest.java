package com.example.halisahaApp.dto.request;

import com.example.halisahaApp.model.enums.MatchFormat;
import com.example.halisahaApp.model.enums.MatchVisibility;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CreateMatchRequest {
    private String name;
    private Date matchDate;
    // TODO time
    private String location;
    private MatchFormat format;
    private MatchVisibility visibility;
    private String ownerUsername;
}
