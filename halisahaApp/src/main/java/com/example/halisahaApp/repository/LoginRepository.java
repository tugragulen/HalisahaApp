package com.example.halisahaApp.repository;

import com.example.halisahaApp.model.LoginModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<LoginModel, Long> {
}
