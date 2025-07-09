## **Descripción General**

### **Arquitectura General del Sistema**

Briisa.app es una plataforma de marketplace para freelancers desarrollada con una arquitectura moderna de aplicación web de página única (SPA). El sistema utiliza:

- **Frontend**: React 18 con TypeScript y Vite como bundler
- **Backend**: Supabase (PostgreSQL + Auth + Storage + Edge Functions)
- **Estilado**: Tailwind CSS para diseño responsivo
- **Estado**: Context API de React para manejo de estado global
- **Routing**: React Router DOM para navegación
- **Autenticación**: Supabase Auth con JWT

### **Tecnologías Utilizadas**

### **Frontend Core**

- **React 18.3.1** - Biblioteca principal de UI
- **TypeScript 5.5.3** - Tipado estático
- **Vite 5.4.2** - Build tool y dev server
- **Tailwind CSS 3.4.1** - Framework de CSS utility-first

### **Backend y Base de Datos**

- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Base de datos relacional
- **Row Level Security (RLS)** - Seguridad a nivel de fila

### **Librerías Adicionales**

- **Lucide React** - Iconografía
- **React Router DOM** - Enrutamiento
- **React Hot Toast** - Notificaciones
- **React Dropzone** - Carga de archivos

### **Principales Funcionalidades**

1. **Sistema de Autenticación**
    - Registro e inicio de sesión con email/contraseña
    - Recuperación de contraseña
    - Perfiles de usuario personalizables
2. **Marketplace de Servicios**
    - Publicación de anuncios de servicios
    - Búsqueda y filtrado avanzado
    - Categorización por especialidades
    - Sistema de precios flexible
3. **Dashboard de Usuario**
    - Gestión de perfil profesional
    - Administración de anuncios
    - Sistema de mensajería
    - Estadísticas y métricas
4. **Sistema de Valoraciones**
    - Reseñas y calificaciones
    - Historial de trabajos
    - Portafolio de proyectos

### **Estructura de Directorios**

```jsx
briisa-app/
├── public/                     # Archivos estáticos
│   ├── favicon.ico
│   ├── logo-*.png             # Logos en diferentes tamaños
│   └── site.webmanifest
├── src/
│   ├── components/            # Componentes reutilizables
│   │   ├── ads/              # Componentes de publicidad
│   │   ├── external-ads/     # Anuncios externos
│   │   ├── layouts/          # Layouts principales
│   │   ├── marketplace/      # Componentes del marketplace
│   │   ├── navigation/       # Navegación y menús
│   │   ├── notifications/    # Sistema de notificaciones
│   │   ├── search/          # Búsqueda y filtros
│   │   ├── sections/        # Secciones de páginas
│   │   └── ui/              # Componentes UI básicos
│   ├── contexts/            # Context providers
│   │   ├── AuthContext.tsx
│   │   ├── NotificationContext.tsx
│   │   └── SearchContext.tsx
│   ├── data/               # Datos hardcodeados
│   │   ├── sampleListings.ts
│   │   └── samplePublications.ts
│   ├── lib/                # Utilidades y configuración
│   │   ├── database.types.ts
│   │   ├── storage.ts
│   │   └── supabaseClient.ts
│   ├── pages/              # Páginas principales
│   │   ├── auth/           # Autenticación
│   │   ├── dashboard/      # Panel de usuario
│   │   ├── marketplace/    # Marketplace
│   │   └── ...
│   ├── services/           # Servicios externos
│   ├── types/              # Definiciones de tipos
│   └── main.tsx           # Punto de entrada
├── supabase/
│   └── migrations/         # Migraciones de base de datos
└── package.json

```

## **Configuración del Entorno**

### **1. Instalar Dependencias Necesarias**

### **Requisitos del Sistema**

- **Node.js**: 18.0.0 o superior
- **npm**: 9.0.0 o superior
- **Git**: Para control de versiones

### **Instalación de Dependencias**

```jsx
# Clonar el repositorio
git clone <repository-url>
cd briisa-app

# Instalar dependencias
npm install

```

### **2. Configurar Variables de Entorno**

Crear archivo `.env` en la raíz del proyecto:

```jsx
# Supabase Configuration
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key

# External Database (Opcional)
VITE_EXTERNAL_DB_URL=https://api.external-ads.com
VITE_EXTERNAL_DB_API_KEY=tu-api-key

```

### **3. Inicializar la Base de Datos**

### **Configuración de Supabase**

1. Crear proyecto en [Supabase](https://supabase.com/)
2. Obtener URL y Anon Key del proyecto
3. Ejecutar migraciones:
    
    ```jsx
    -- Las migraciones se encuentran en supabase/migrations/
    -- Ejecutar en orden cronológico en el SQL Editor de Supabase
    
    ```
    

### **Estructura de Tablas Principales**

- `profiles` - Perfiles de usuario
- `listings` - Anuncios del marketplace
- `ratings` - Valoraciones y reseñas
- `portfolio_items` - Elementos del portafolio
- `listing_images` - Imágenes de anuncios

### **4. Ejecutar el Proyecto Localmente**

```jsx
# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## **Estructura de la Base de Datos**

### **Diagrama de Relaciones**

```jsx
profiles (1) ←→ (N) listings
profiles (1) ←→ (N) portfolio_items
profiles (1) ←→ (N) ratings (como freelancer)
profiles (1) ←→ (N) ratings (como cliente)
listings (1) ←→ (N) listing_images
listings (1) ←→ (N) ratings
```

### **Descripción de Tablas**

### **`profiles`**

```jsx
- id: UUID (PK, FK a auth.users)
- full_name: TEXT
- username: TEXT (UNIQUE)
- avatar_url: TEXT
- bio: TEXT
- website: TEXT
- location: TEXT
- skills: TEXT[]
- hourly_rate: NUMERIC
- category: TEXT
- availability: TEXT
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

### **`listings`**

```jsx
- id: UUID (PK)
- title: TEXT (NOT NULL)
- description: TEXT (NOT NULL)
- category: TEXT (NOT NULL)
- price: NUMERIC (NOT NULL)
- price_type: TEXT (NOT NULL)
- status: TEXT (DEFAULT 'active')
- author_id: UUID (FK a profiles.id)
- location: TEXT
- contact_info: TEXT
- tags: TEXT[]
- image_urls: TEXT[]
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

### **`ratings`**

```jsx
- id: UUID (PK)
- rating: INTEGER (1-5, NOT NULL)
- comment: TEXT
- freelancer_id: UUID (FK a profiles.id)
- client_id: UUID (FK a profiles.id)
- listing_id: UUID (FK a listings.id)
- created_at: TIMESTAMPTZ
```

### **Queries Principales**

### **Buscar Listings con Filtros**

```jsx
SELECT l.*, p.full_name as author_name, p.avatar_url
FROM listings l
JOIN profiles p ON l.author_id = p.id
WHERE l.status = 'active'
  AND l.title ILIKE '%search_term%'
  AND l.category = 'category_filter'
  AND l.price BETWEEN min_price AND max_price
ORDER BY l.created_at DESC;
```

### **Obtener Estadísticas de Freelancer**

```jsx
SELECT 
  p.id,
  COUNT(DISTINCT l.id) as total_listings,
  COUNT(DISTINCT r.id) as total_reviews,
  AVG(r.rating) as average_rating
FROM profiles p
LEFT JOIN listings l ON l.author_id = p.id
LEFT JOIN ratings r ON r.freelancer_id = p.id
GROUP BY p.id;
```

## **Flujo de Datos y Lógica de Negocio**

### **Flujos de Trabajo Principales**

### **1. Registro y Autenticación**

`Usuario → Formulario Registro → Supabase Auth → Crear Perfil → Redirección Dashboard`

### **2. Creación de Anuncio**

`Usuario Autenticado → Formulario Anuncio → Validación → Subida Imágenes → Insertar BD → Actualizar Lista`

### **3. Búsqueda y Filtrado**

`Input Búsqueda → Context Search → Supabase Query → Filtros Aplicados → Resultados Actualizados`

### **Integración Frontend-Backend**

### **Context Providers**

- **AuthContext**: Manejo de autenticación y usuario actual
- **SearchContext**: Estado de búsqueda y sugerencias
- **NotificationContext**: Sistema de notificaciones

### **Hooks Personalizados**

`// Ejemplo de uso del AuthContextconst` 

`{ user, signIn, signOut, loading } = useAuth();`

`// Ejemplo de uso del SearchContextconst` 

`{ searchTerm, setSearchTerm, suggestions } = useSearch();`

### **Manejo de Estados**

### **Estado Global (Context)**

- Usuario autenticado
- Configuración de búsqueda
- Notificaciones
- Configuraciones de usuario

### **Estado Local (useState)**

- Formularios
- Modales
- Filtros temporales
- Estados de carga

### **Procesos Asíncronos**

### **Carga de Datos**

```jsx
const fetchListings = async () => {
  setIsLoading(true);
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('status', 'active');
    
    if (error) throw error;
    setListings(data);
  } catch (error) {
    toast.error('Error al cargar anuncios');
  } finally {
    setIsLoading(false);
  }
};
```

### **Subida de Archivos**

```jsx
const uploadImage = async (file: File) => {
  const { data, error } = await supabase.storage
    .from('listings')
    .upload(`${userId}/${listingId}/${filename}`, file);
  
  if (error) throw error;
  return data.path;
};

```

### **Validaciones Implementadas**

### **Frontend**

- Validación de formularios con estados locales
- Validación de tipos de archivo
- Límites de tamaño de imagen
- Validación de campos requeridos

### **Backend (Supabase)**

- Row Level Security (RLS)
- Constraints de base de datos
- Validación de tipos de datos
- Políticas de acceso

## **API y Endpoints**

### **Autenticación (Supabase Auth)**

### **Registro**

```jsx
POST /auth/v1/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "data": {
    "full_name": "Usuario Ejemplo"
  }
}
```

### **Inicio de Sesión**

```jsx
POST /auth/v1/token?grant_type=password
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

```

### **Base de Datos (Supabase REST API)**

### **Obtener Listings**

```jsx
GET /rest/v1/listings?select=*,profiles(full_name,avatar_url)&status=eq.active
Authorization: Bearer <jwt_token>

```

### **Crear Listing**

```jsx
POST /rest/v1/listings
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Diseño de Logo",
  "description": "Servicio profesional...",
  "category": "Diseño Gráfico",
  "price": 299,
  "price_type": "proyecto"
}
```

### **Actualizar Perfil**

```jsx
PATCH /rest/v1/profiles?id=eq.<user_id>
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
"full_name": "Nuevo Nombre",
"bio": "Nueva biografía..."
}
```

### **Storage (Supabase Storage)**

### **Subir Imagen**

```jsx
POST /storage/v1/object/listings/<path>
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

<binary_data>
```

### **Autenticación y Autorización**

### **JWT Token**

- Incluir en header: `Authorization: Bearer <token>`
- Renovación automática por Supabase client
- Expiración: 1 hora (renovable)

### **Row Level Security**

- Usuarios solo pueden modificar sus propios datos
- Listings públicos para lectura
- Imágenes públicas para visualización

### **Rate Limits**

### **Supabase Limits (Plan Gratuito)**

- **Database**: 500MB storage
- **Auth**: 50,000 usuarios activos mensuales
- **Storage**: 1GB
- **Edge Functions**: 500,000 invocaciones/mes

## **Guía de Contribución**

### **Estándares de Código**

### **TypeScript**

- Usar tipos explícitos siempre que sea posible
- Interfaces para objetos complejos
- Enums para constantes relacionadas
- Evitar `any`, usar `unknown` si es necesario

### **React**

- Componentes funcionales con hooks
- Props tipadas con interfaces
- Usar `React.FC` para componentes
- Memoización con `useMemo`/`useCallback` cuando sea necesario

### **CSS/Tailwind**

- Clases utilitarias de Tailwind
- Componentes responsivos (mobile-first)
- Consistencia en espaciado (sistema de 8px)
- Usar variables CSS para temas

### **Proceso de Branching**

### **Estructura de Branches**

```jsx
main (producción)
├── develop (desarrollo)
├── feature/nueva-funcionalidad
├── bugfix/correccion-error
└── hotfix/arreglo-urgente
```

### **Flujo de Trabajo**

1. Crear branch desde `develop`
2. Desarrollar funcionalidad
3. Commit con mensajes descriptivos
4. Push y crear Pull Request
5. Code review
6. Merge a `develop`
7. Deploy a staging
8. Merge a `main` para producción

### **Procedimiento para Pull Requests**

### **Checklist**

- Código sigue estándares establecidos
- Tests pasan correctamente
- Documentación actualizada
- No hay console.logs en producción
- Componentes son responsivos
- Accesibilidad verificada

### **Template de PR**

```jsx
## Descripción
Breve descripción de los cambios

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## Testing
- [ ] Tests unitarios
- [ ] Tests de integración
- [ ] Testing manual

## Screenshots
(Si aplica)
```

### **Convenciones de Nombrado**

### **Archivos y Carpetas**

- **Componentes**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useAuth.ts`)
- **Utilidades**: camelCase (`formatDate.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

### **Variables y Funciones**

- **Variables**: camelCase (`userName`)
- **Funciones**: camelCase (`handleSubmit`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
- **Interfaces**: PascalCase con prefijo `I` (`IUserProfile`)

### **Git Commits**

```jsx
feat: agregar sistema de notificaciones
fix: corregir error en carga de imágenes
docs: actualizar README
style: mejorar espaciado en header
refactor: reorganizar componentes de auth
test: agregar tests para UserProfile
```

### **Pruebas Requeridas**

### **Tipos de Testing**

1. **Unit Tests**: Funciones y hooks individuales
2. **Component Tests**: Renderizado y interacciones
3. **Integration Tests**: Flujos completos
4. **E2E Tests**: Casos de uso críticos

### **Herramientas Sugeridas**

- **Vitest**: Testing framework
- **React Testing Library**: Testing de componentes
- **Playwright**: E2E testing

## **Solución de Problemas**

### **Errores Comunes y Soluciones**

### **1. Error de Conexión a Supabase**

`Error: Invalid API key or URL`

**Solución**: Verificar variables de entorno en `.env`

### **2. Error de Autenticación**

`Error: JWT expired`

**Solución**: Refrescar token automáticamente con Supabase client

### **3. Error de Carga de Imágenes**

`Error: File size too large`

**Solución**: Validar tamaño antes de subir (max 5MB)

### **4. Error de RLS**

`Error: Row level security policy violation`

**Solución**: Verificar políticas de seguridad en Supabase

### **Logs y Monitoreo**

### **Desarrollo**

```jsx
// Usar console.log solo en desarrollo
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}
```

### **Producción**

- Supabase Dashboard para logs de base de datos
- Vercel Analytics para métricas de frontend
- Sentry para error tracking (recomendado)

### **Proceso de Debugging**

### **Frontend**

1. React DevTools para componentes
2. Network tab para requests
3. Console para errores JavaScript
4. Lighthouse para performance

### **Backend**

1. Supabase Dashboard para queries
2. SQL Editor para testing manual
3. Auth logs para problemas de autenticación
4. Storage logs para archivos

### **Contactos para Soporte**

### **Equipo de Desarrollo**

- **Lead Developer**: [Nombre] - [email@example.com](mailto:email@example.com)
- **Frontend**: [Nombre] - [email@example.com](mailto:email@example.com)
- **Backend**: [Nombre] - [email@example.com](mailto:email@example.com)

### **Canales de Comunicación**

- **Slack**: #briisa-dev
- **Email**: [dev-team@briisa.app](mailto:dev-team@briisa.app)
- **Issues**: GitHub Issues
- **Documentación**: Confluence/Notion

### **Horarios de Soporte**

- **Lunes a Viernes**: 9:00 - 18:00 CET
- **Emergencias**: 24/7 (solo producción)
- **Tiempo de respuesta**: 4 horas laborables

---

**Nota**: Esta documentación debe mantenerse actualizada con cada cambio significativo en el código. Última actualización: Enero 2025.