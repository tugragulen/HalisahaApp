package com.example.halisahaApp.controller;

import com.example.halisahaApp.dto.request.InviteMatchRequest;
import com.example.halisahaApp.dto.request.RespondInvitationRequest;
import com.example.halisahaApp.service.InvitationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/invite")
@CrossOrigin("*")
@RequiredArgsConstructor
public class InvitationController {
    private final InvitationService service;

    @PostMapping
    public ResponseEntity<?> inviteMatch(@RequestBody InviteMatchRequest request, Authentication auth) {
        service.inviteMatch(request, auth);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/respond")
    public ResponseEntity<?> respondInvitation(@RequestBody RespondInvitationRequest request) {
        service.respondInvitation(request);
        return ResponseEntity.ok().build();
    }
}
