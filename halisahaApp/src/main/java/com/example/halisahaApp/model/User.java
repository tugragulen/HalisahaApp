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
public class User extends BaseEntity {
    private String username;
    private String password;
    private String email;
    @Column(name = "is_verified")
    private boolean isVerified;

    @Column(name = "verification_token")
    private String verificationToken;

    @Enumerated(EnumType.STRING)
    private RoleEnum role;
    @Column(name = "x_position")
    private double xPosition;

    @Column(name = "y_position")
    private double yPosition;

    @OneToMany
    private List<Participant> matches = new ArrayList<>();

    @OneToMany
    private List<MatchAdmin> adminMatches = new ArrayList<>();

    @OneToMany
    private List<Match> owneredMatches = new ArrayList<>();

}
