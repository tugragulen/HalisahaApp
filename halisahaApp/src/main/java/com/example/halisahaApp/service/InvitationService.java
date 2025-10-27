package com.example.halisahaApp.service;

import com.example.halisahaApp.dto.MailDto;
import com.example.halisahaApp.dto.request.InviteMatchRequest;
import com.example.halisahaApp.model.Invitation;
import com.example.halisahaApp.model.Match;
import com.example.halisahaApp.model.User;
import com.example.halisahaApp.repository.InvitationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InvitationService {
    private final MatchService matchService;
    private final UserService userService;
    private final MailService mailService;
    private final InvitationRepository repository;

    @Transactional
    public void inviteMatch(InviteMatchRequest request, Authentication auth) {
        Match match = matchService.findById(request.roomId()).orElseThrow(
                () -> new UnsupportedOperationException("Match not found")
        );
        String username = auth.getName();
        User user = userService.findByUsername(username).orElseThrow(
                () -> new UnsupportedOperationException("User not found")
        );

        String matchLink = "http://localhost:3000/match/" + match.getId();

        mailService.sendMail(new MailDto(
                request.invitedMail(),
                "Halısaha Davet",
                "%s size bir halısaha daveti gönderdi. Linke tıklayarak katılabilirsiniz. %s"
                        .formatted(username, matchLink)
        ));

        Invitation invitation = new Invitation();
        invitation.setMatch(match);
        invitation.setInvitedBy(user);
        invitation.setInvitedMail(request.invitedMail());
        repository.save(invitation);
    }
}
