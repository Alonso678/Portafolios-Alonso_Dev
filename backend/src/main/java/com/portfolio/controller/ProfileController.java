package com.portfolio.controller;

import com.portfolio.model.ProfileInfo;
import com.portfolio.repository.ProfileRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    private final ProfileRepository repository;

    public ProfileController(ProfileRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ProfileInfo getProfile() {
        // Devuelve siempre el primer registro de perfil configurado
        return repository.findById(1L).orElseGet(() -> {
            ProfileInfo p = new ProfileInfo();
            p.setName("JOSÉ ALONSO ORTIZ SALVADOR");
            return repository.save(p);
        });
    }

    @PutMapping
    public ProfileInfo updateProfile(@RequestBody ProfileInfo profileInfo) {
        profileInfo.setId(1L); // Asegura que actualice siempre el registro principal
        return repository.save(profileInfo);
    }
}