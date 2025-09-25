package com.example.halisahaApp.repository;

import com.example.halisahaApp.model.SignUpModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SignUpRepository extends JpaRepository<SignUpModel, Long> {
    Optional<SignUpModel> findByToken(String token);

    Optional<SignUpModel> findByUsername(String username);

    Optional<SignUpModel> findByEmail(String email);
}
