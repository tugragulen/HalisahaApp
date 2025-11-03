package com.example.halisahaApp.repository;

import com.example.halisahaApp.model.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    Optional<Participant> findByUserIdAndMatchId(Long userId, Long matchId);
}
