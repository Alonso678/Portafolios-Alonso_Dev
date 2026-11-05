# Portafolio Interactivo con Flyway Migration - José Alonso Ortiz Salvador

Este proyecto integra **React 18 + Tailwind CSS + Lucide Icons** en el Frontend, **Spring Boot 3 + Flyway DB Migration** en el Backend, y **PostgreSQL** como Base de Datos, listo para desplegarse localmente en el puerto **`:3000`**.

## 🚀 Despliegue Rápido (Docker Compose)

```bash
docker-compose up --build -d
```

### URLs de Acceso:
- **Frontend Interactivo:** [http://localhost:3000](http://localhost:3000)
- **Backend API REST:** [http://localhost:8080/api/experiences](http://localhost:8080/api/experiences)
- **Base de Datos:** PostgreSQL en `localhost:5432`

## 📦 Control de Versiones con Flyway
Las migraciones SQL están ubicadas en `backend/src/main/resources/db/migration/`:
- `V1__init_schema.sql`: Creación de la tabla `experiences` y tabla de seguimiento `flyway_schema_history`.
- `V2__seed_initial_data.sql`: Carga de datos iniciales del CV.