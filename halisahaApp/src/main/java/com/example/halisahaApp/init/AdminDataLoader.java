package com.example.halisahaApp.init;

import com.example.halisahaApp.model.User;
import com.example.halisahaApp.model.enums.RoleEnum;
import com.example.halisahaApp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminDataLoader implements CommandLineRunner {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByEmail("admin@halisaha.com").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@halisaha.com");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setVerified(true);
            admin.setRole(RoleEnum.ROLE_ADMIN);
            userRepository.save(admin);
        }
    }
}
