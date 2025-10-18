package com.example.halisahaApp.repository;

import com.example.halisahaApp.model.Match;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Match, Long> {
}
