-- V4: Inserción del usuario administrador inicial
-- Contraseña en claro: admin2026
-- Hash BCrypt: $2a$10$r9GZ3rX.9p1t/QYmYj3z1e3fM3gZ7yK7x8V9u0W1X2Y3Z4A5B6C7D
INSERT INTO users (username, password, email, role, enabled)
VALUES (
    'alonso',
    '$2a$10$r9GZ3rX.9p1t/QYmYj3z1e3fM3gZ7yK7x8V9u0W1X2Y3Z4A5B6C7D',
    'darkalon678@gmail.com',
    'ROLE_ADMIN',
    TRUE
)
ON CONFLICT (username) DO NOTHING;
