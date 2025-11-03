package com.example.halisahaApp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "t_field_position")
@Getter
@Setter
public class FieldPosition extends BaseEntity {

    @Column(nullable = false)
    private double x;

    @Column(nullable = false)
    private double y;

    @OneToOne(mappedBy = "position")
    private Participant participant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "match_id")
    private Match match;

}
