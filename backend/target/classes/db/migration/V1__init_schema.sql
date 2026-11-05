-- V1: Creacion de la tabla inicial de experiencias
CREATE TABLE IF NOT EXISTS experiences (
    id BIGSERIAL PRIMARY KEY,
    role VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    period VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    description TEXT NOT NULL
);