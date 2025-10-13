package com.example.halisahaApp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class SignUpModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String email;
    private boolean isVerified;
    private String token;

    @OneToOne(mappedBy = "signUpModel", cascade = CascadeType.ALL, orphanRemoval = true)
    private User user;

    public void setUser(User user) {
        this.user = user;
        if (user != null) {
            user.setSignUpModel(this);
        }
    }
}
