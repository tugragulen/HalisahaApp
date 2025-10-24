package com.example.halisahaApp.controller;

import com.example.halisahaApp.dto.request.CreateMatchRequest;
import com.example.halisahaApp.model.User;
import com.example.halisahaApp.service.MatchService;
import com.example.halisahaApp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/match")
@CrossOrigin("*")
@RequiredArgsConstructor
public class MatchController {
    private final MatchService matchService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> createMatch(@RequestBody CreateMatchRequest request) {
        matchService.createMatch(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<?> getAllMatches(Authentication auth) {
        String username = auth.getName();
        User user = userService.findByUsername(username).orElseThrow();
        return ResponseEntity.ok(matchService.findAll(user.getId()));
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<?> getMatch(@PathVariable Long roomId) {
        return ResponseEntity.ok(matchService.findMatchById(roomId));
    }
}
