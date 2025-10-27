package com.example.halisahaApp.repository;

import com.example.halisahaApp.model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {
}
