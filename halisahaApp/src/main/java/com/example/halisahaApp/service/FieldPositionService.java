package com.example.halisahaApp.service;

import com.example.halisahaApp.model.FieldPosition;
import com.example.halisahaApp.repository.FieldPositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FieldPositionService {
    private final FieldPositionRepository repository;

    public void saveAll(List<FieldPosition> positions) {
        repository.saveAll(positions);
    }
}
