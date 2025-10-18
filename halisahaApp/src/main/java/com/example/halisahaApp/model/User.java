package com.example.halisahaApp.model;

import com.example.halisahaApp.model.enums.RoleEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
    @Id
    private Long id;
    @Enumerated(EnumType.STRING)
    private RoleEnum role;
    private double xPosition;
    private double yPosition;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private SignUpModel signUpModel;

    @OneToMany
    private List<Participant> matches = new ArrayList<>();

    @OneToMany
    private List<MatchAdmin> adminMatches = new ArrayList<>();

    @OneToMany
    private List<Match> owneredMatches = new ArrayList<>();

}
