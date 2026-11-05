package com.portfolio.model;

import jakarta.persistence.*;
import java.util.List;
import java.util.Arrays;
import java.util.stream.Collectors;

@Entity
@Table(name = "experiences")
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String role;
    private String company;
    private String period;
    private String location;

    @Column(length = 1000)
    private String description;

    // Almacenamos las tecnologías separadas por comas en una columna de texto
    @Column(length = 500)
    private String techs;

    public Experience() {}

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getTechs() { return techs; }
    public void setTechs(String techs) { this.techs = techs; }
}