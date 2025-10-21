package com.example.halisahaApp.model;

import com.example.halisahaApp.model.enums.MatchFormat;
import com.example.halisahaApp.model.enums.MatchVisibility;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "t_matches")
@Getter
@Setter
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Temporal(TemporalType.DATE)
    private LocalDate date;

    @Temporal(TemporalType.TIME)
    private LocalTime time;

    private String location;

    @Enumerated(EnumType.STRING)
    private MatchFormat format;

    @Enumerated(EnumType.STRING)
    private MatchVisibility visibility;

    @OneToMany(mappedBy = "match")
    private List<Participant> players;

    @OneToMany(mappedBy = "match")
    private List<MatchAdmin> admins;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User matchOwner;

}
