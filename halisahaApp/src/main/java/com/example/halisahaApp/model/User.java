package com.example.halisahaApp.model;

import com.example.halisahaApp.model.enums.RoleEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_users")
@Getter
@Setter
public class User extends BaseEntity {
    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    @Column(name = "is_verified")
    private boolean isVerified;

    @Column(name = "verification_token")
    private String verificationToken;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoleEnum role = RoleEnum.ROLE_USER;

    @Column(name = "x_position")
    private double xPosition;

    @Column(name = "y_position")
    private double yPosition;

    @OneToMany(mappedBy = "user")
    private List<Participant> matches = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<MatchAdmin> adminMatches = new ArrayList<>();

    @OneToMany
    private List<Match> owneredMatches = new ArrayList<>();

}
