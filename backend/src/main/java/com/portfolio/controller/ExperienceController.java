package com.portfolio.controller;

import com.portfolio.model.Experience;
import com.portfolio.repository.ExperienceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experiences")
@CrossOrigin(origins = "*")
public class ExperienceController {

    private final ExperienceRepository repository;

    public ExperienceController(ExperienceRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Experience> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Experience create(@RequestBody Experience experience) {
        return repository.save(experience);
    }

    @PutMapping("/{id}")
    public Experience update(@PathVariable Long id, @RequestBody Experience experience) {
        experience.setId(id);
        return repository.save(experience);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}