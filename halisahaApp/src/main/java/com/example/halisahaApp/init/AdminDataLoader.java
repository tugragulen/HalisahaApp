package com.example.halisahaApp.init;

import com.example.halisahaApp.model.SignUpModel;
import com.example.halisahaApp.model.User;
import com.example.halisahaApp.model.enums.RoleEnum;
import com.example.halisahaApp.repository.SignUpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminDataLoader implements CommandLineRunner {
    private final SignUpRepository signUpRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (signUpRepository.findByEmail("admin@halisaha.com").isEmpty()) {
            SignUpModel admin = new SignUpModel();
            admin.setUsername("admin");
            admin.setEmail("admin@halisaha.com");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setVerified(true);
            User adminUser = new User();
            adminUser.setRole(RoleEnum.ROLE_ADMIN);
            admin.setUser(adminUser);
            signUpRepository.save(admin);
        }
    }
}
