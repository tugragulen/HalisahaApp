package com.example.halisahaApp.repository;

import com.example.halisahaApp.model.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Long> {
    @Query("""
            SELECT DISTINCT m
            FROM Match m
            LEFT JOIN m.players p
            WHERE m.matchOwner.id = :userId
            OR p.user.id = :userId
            """)
    List<Match> findAllByUser(Long userId);
}
