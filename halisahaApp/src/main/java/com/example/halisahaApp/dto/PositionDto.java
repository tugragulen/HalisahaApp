package com.example.halisahaApp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PositionDto {
    private Long id;
    private double x;
    private double y;
    private Long userId;
}
