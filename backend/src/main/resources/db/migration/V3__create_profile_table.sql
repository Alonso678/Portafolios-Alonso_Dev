-- V3: Creacion de la tabla de perfil y datos generales
CREATE TABLE IF NOT EXISTS profile_info (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    linkedin VARCHAR(255),
    summary TEXT NOT NULL,
    image_url TEXT
);

-- Insertar el registro inicial del perfil
INSERT INTO profile_info (name, title, email, phone, location, linkedin, summary, image_url) VALUES 
('JOSÉ ALONSO ORTIZ SALVADOR', 'DESARROLLADOR JAVA | ESPECIALISTA EN MICROSERVICIOS | SECTOR BANCARIO', 'darkalon678@gmail.com', '771 3318966', 'Mixquiahuala de Juárez, Hidalgo, MX', 'linkedin.com/in/jose-alonso-ortiz-salvador', 'Analista de sistemas con habilidades sólidas en programación y solución de problemas técnicos en entornos de tecnologías de la información. Especializado en el ecosistema Java y arquitecturas orientadas a microservicios. Alta capacidad de adaptación, calidad de código y resolución de incidencias complejas.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80');