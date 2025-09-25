package com.example.halisahaApp.model;

import com.example.halisahaApp.model.enums.RoleEnum;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
public class UserModel {
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
}
