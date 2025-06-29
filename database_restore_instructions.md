# Instrucciones de Restauración de Base de Datos

## Copia de Seguridad de Briisa.app - PostgreSQL

Este archivo contiene una copia de seguridad completa de la base de datos de Briisa.app, convertida a SQL estándar de PostgreSQL.

### 📋 Contenido del Backup

#### Estructura de Datos
- **5 Tablas principales**: profiles, listings, ratings, portfolio_items, listing_images
- **Relaciones completas**: Foreign keys y constraints
- **Índices optimizados**: Para búsquedas y rendimiento
- **Triggers**: Para actualización automática de timestamps

#### Funciones y Procedimientos
- `update_modified_column()`: Actualiza automáticamente updated_at
- `search_listings()`: Función de búsqueda avanzada
- `gen_random_uuid()`: Generación de UUIDs

#### Vistas
- `listings_with_author`: Listings con información del autor
- `freelancer_stats`: Estadísticas de freelancers

#### Datos de Ejemplo
- 3 perfiles de usuario completos
- 3 anuncios de diferentes categorías
- Valoraciones y elementos de portafolio

### 🚀 Cómo Restaurar

#### Requisitos Previos
```bash
# PostgreSQL 12 o superior
# Extensiones: uuid-ossp, pgcrypto
```

#### Pasos de Instalación

1. **Crear base de datos**
```sql
CREATE DATABASE briisa_app;
\c briisa_app;
```

2. **Ejecutar el backup**
```bash
psql -d briisa_app -f database_backup.sql
```

3. **Verificar instalación**
```sql
-- Verificar tablas
\dt

-- Verificar datos
SELECT COUNT(*) FROM profiles;
SELECT COUNT(*) FROM listings;
SELECT COUNT(*) FROM ratings;
```

### 🔧 Configuración Post-Instalación

#### Variables de Entorno Recomendadas
```env
DATABASE_URL=postgresql://usuario:password@localhost:5432/briisa_app
DB_HOST=localhost
DB_PORT=5432
DB_NAME=briisa_app
DB_USER=tu_usuario
DB_PASSWORD=tu_password
```

#### Configuración de Roles
```sql
-- Crear usuario de aplicación
CREATE USER app_user WITH PASSWORD 'secure_password';
GRANT app_user TO current_user;

-- Crear usuario administrador
CREATE USER app_admin WITH PASSWORD 'admin_password';
GRANT app_admin TO current_user;
```

### 📊 Estructura de Tablas

#### profiles
- Información de usuarios/freelancers
- Habilidades, tarifas, disponibilidad
- Avatar y datos de contacto

#### listings
- Anuncios del marketplace
- Precios, categorías, descripciones
- Múltiples imágenes por anuncio

#### ratings
- Sistema de valoraciones 1-5 estrellas
- Comentarios y reseñas
- Relación con freelancers y clientes

#### portfolio_items
- Elementos del portafolio
- Enlaces a trabajos externos
- Descripciones de proyectos

#### listing_images
- Gestión de múltiples imágenes
- Orden y metadatos
- URLs de almacenamiento

### 🔍 Funciones de Búsqueda

#### Búsqueda Avanzada
```sql
-- Buscar por término, categoría y precio
SELECT * FROM search_listings(
    'diseño',           -- término de búsqueda
    'Diseño Gráfico',   -- categoría
    100,                -- precio mínimo
    500,                -- precio máximo
    'Madrid'            -- ubicación
);
```

#### Estadísticas de Freelancers
```sql
-- Ver estadísticas completas
SELECT * FROM freelancer_stats 
WHERE total_listings > 0 
ORDER BY average_rating DESC;
```

### 🛡️ Seguridad

#### Permisos por Rol
- **app_user**: CRUD en tablas principales
- **app_admin**: Acceso completo
- **Triggers**: Protección de integridad

#### Validaciones
- Ratings entre 1-5 estrellas
- UUIDs únicos para todas las entidades
- Timestamps automáticos

### 🔄 Migración desde Supabase

Este backup es **100% compatible** con PostgreSQL estándar y **no requiere Supabase**. 

#### Diferencias Eliminadas
- ✅ Row Level Security (RLS) removido
- ✅ Políticas de Supabase convertidas a roles estándar
- ✅ Funciones auth.* reemplazadas por equivalentes
- ✅ Storage buckets convertidos a URLs estándar

#### Mantenimiento de Funcionalidad
- ✅ Todas las relaciones preservadas
- ✅ Triggers y funciones convertidas
- ✅ Índices optimizados mantenidos
- ✅ Datos de ejemplo incluidos

### 📞 Soporte

Para problemas con la restauración:

1. Verificar versión de PostgreSQL (12+)
2. Confirmar extensiones instaladas
3. Revisar permisos de usuario
4. Consultar logs de PostgreSQL

### 📝 Notas Adicionales

- **Encoding**: UTF-8
- **Timezone**: UTC por defecto
- **Collation**: Estándar PostgreSQL
- **Backup Date**: 2025-01-01
- **Version**: Compatible con PostgreSQL 12+

Este backup garantiza una migración completa y funcional de la base de datos Briisa.app a cualquier instancia de PostgreSQL estándar.