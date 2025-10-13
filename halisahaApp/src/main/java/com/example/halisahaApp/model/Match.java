package com.example.halisahaApp.model;

import com.example.halisahaApp.model.enums.MatchFormat;
import com.example.halisahaApp.model.enums.MatchVisibility;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Temporal(TemporalType.DATE)
    private Date matchDate;

    private String location;

    @Enumerated(EnumType.STRING)
    private MatchFormat format;

    @Enumerated(EnumType.STRING)
    private MatchVisibility visibility;

    @OneToMany
    private List<User> players;
}
