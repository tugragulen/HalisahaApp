package com.example.halisahaApp.controller;

import com.example.halisahaApp.dto.request.CreateMatchRequest;
import com.example.halisahaApp.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/match")
@CrossOrigin("*")
@RequiredArgsConstructor
public class MatchController {
    private final MatchService matchService;

    @PostMapping
    public ResponseEntity<?> createMatch(@RequestBody CreateMatchRequest request) {
        matchService.createMatch(request);
        return ResponseEntity.ok().build();
    }
}
