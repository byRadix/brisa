# Reglas del Proyecto: Plataforma de Anuncios y Chat

Este documento define las reglas y convenciones para el desarrollo de este proyecto. Seguir estas guías es fundamental para mantener un código limpio, seguro y escalable.

## 1. Principios Generales

- **Component-Driven:** Todo se construye a partir de componentes. Piensa en la reutilización desde el principio.
- **Mobile-First:** El diseño y la maquetación deben partir de la vista móvil y escalar hacia pantallas más grandes.
- **Seguridad por Defecto:** La seguridad no es una ocurrencia tardía. Especialmente en Supabase, todas las tablas deben tener políticas de RLS bien definidas desde su creación.

## 2. Arquitectura de Componentes (React)

- **Estructura de Carpetas:**
  - `src/components/ui/`: Para componentes de UI genéricos y reutilizables (Button, Input, Card, Avatar). No deben tener lógica de negocio.
  - `src/components/layout/`: Componentes estructurales (Navbar, Footer, Sidebar, PageLayout).
  - `src/components/features/`: Componentes complejos relacionados con una funcionalidad específica (ej. `AdCard`, `ChatWindow`, `AdCreationForm`).
- **Gestión de Estado:**
  - **Estado Local (`useState`, `useReducer`):** Usar para el estado que solo afecta a un componente (ej. visibilidad de un modal, campos de un formulario).
  - **Context API (`useContext`):** Usar para estado global simple que no cambia con frecuencia, como la información del usuario autenticado o el tema (claro/oscuro).
  - **Librerías de Estado (Zustand/Jotai):** Considerar para estados complejos o que se actualizan frecuentemente, como los mensajes de un chat en tiempo real.
- **Hooks Personalizados:**
  - La lógica reutilizable (ej. fetching de datos, suscripciones de Supabase) debe extraerse a hooks personalizados (`useUserProfile`, `useAds`).
  - Los hooks deben estar en `src/hooks/`.

## 3. Estilo (Tailwind CSS)

- **No uses valores arbitrarios:** Evita `className="top-[13px]"`. Si necesitas un valor específico que usarás más de una vez, extiéndelo en el `theme` de tu archivo `tailwind.config.js`.
- **Componentes vs. `@apply`:**
  - **Prioriza Componentes:** En lugar de crear clases complejas con `@apply` (ej. `.btn-primary`), crea un componente de React (`<Button variant="primary">`). Esto mantiene la lógica y el estilo encapsulados en un solo lugar.
  - **Usa `@apply` con moderación:** Es útil para agrupar utilidades que se repiten en elementos base dentro de un archivo CSS global (ej. estilos de los `h1`, `p`, `a`).
- **Organización de Clases:** Usa un orden de clases consistente (ej. el que provee el plugin oficial de Prettier para Tailwind CSS) para mantener la legibilidad.

## 4. Backend y Datos (Supabase)

Esta es la sección más crítica para la seguridad y funcionalidad de la plataforma.

### 4.1. Cliente Supabase

- El cliente de Supabase debe ser inicializado una única vez en un archivo dedicado (ej. `src/lib/supabaseClient.js`) y exportado para ser usado en toda la aplicación.
- Toda la interacción con Supabase debe realizarse a través de funciones o servicios definidos en `src/services/`. Nunca llames a Supabase directamente desde los componentes de UI.

### 4.2. Esquema de Base de Datos (Tablas principales)

- **`profiles`**: Almacena datos públicos de los usuarios. Se vincula 1 a 1 con `auth.users`.
  - `id` (UUID, FK a `auth.users.id`)
  - `username` (text)
  - `avatar_url` (text)
- **`ads`** (Anuncios):
  - `id` (UUID, PK)
  - `title` (text)
  - `description` (text)
  - `price` (numeric)
  - `image_url` (text)
  - `owner_id` (UUID, FK a `profiles.id`)
- **`conversations`**:
  - `id` (UUID, PK)
  - `ad_id` (UUID, FK a `ads.id`)
- **`conversation_participants`**: Tabla pivote para la relación N-M entre usuarios y conversaciones.
  - `conversation_id` (UUID, FK)
  - `profile_id` (UUID, FK)
- **`messages`**:
  - `id` (UUID, PK)
  - `conversation_id` (UUID, FK)
  - `sender_id` (UUID, FK a `profiles.id`)
  - `content` (text)

### 4.3. Seguridad a Nivel de Fila (RLS) - ¡CRÍTICO!

Todas las tablas DEBEN tener RLS habilitado.

- **Tabla `profiles`:**
  - `SELECT`: Público para todos.
  - `UPDATE`: Solo para el propio usuario (`auth.uid() = id`).
- **Tabla `ads` (Anuncios):**
  - `SELECT`: Público para todos.
  - `INSERT`: Requiere que el usuario esté autenticado.
  - `UPDATE` / `DELETE`: Solo para el dueño del anuncio (`auth.uid() = owner_id`).
- **Tablas `conversations` y `messages`:**
  - `SELECT` / `INSERT`: Solo para los participantes de la conversación. Esta es la regla más compleja y requiere verificar la pertenencia en la tabla `conversation_participants`.
  - `UPDATE` / `DELETE`: Deshabilitado o restringido únicamente al emisor del mensaje (`auth.uid() = sender_id`).

### 4.4. Almacenamiento (Supabase Storage)

- Crear un bucket llamado `ad-images` y hacerlo público para lectura.
- La subida de imágenes (`upload`) debe estar protegida por políticas que solo permitan a usuarios autenticados subir archivos a una ruta que contenga su `user_id`.

## 5. Nomenclatura y Convenciones

- **Archivos de Componentes:** `PascalCase` (ej. `AdCard.tsx`).
- **Otros archivos JS/TS:** `camelCase` (ej. `supabaseClient.js`, `useAuth.ts`).
- **Variables y Funciones:** `camelCase`.
- **Tipos e Interfaces (TS):** `PascalCase` (ej. `interface Ad { ... }`).

# Reglas de Desarrollo para Brisa.app - Plataforma de Marketplace para Freelancers

## 🎯 Objetivo del Proyecto
Brisa.app es una plataforma de marketplace para freelancers que conecta profesionales con clientes. El proyecto debe desarrollarse con una arquitectura escalable, mantenible y siguiendo las mejores prácticas de desarrollo moderno.

## 🏗️ Arquitectura y Estructura

### Principios Arquitectónicos
- **Arquitectura SPA (Single Page Application)** con React 18 + TypeScript
- **Backend-as-a-Service** con Supabase (PostgreSQL + Auth + Storage)
- **Separación de responsabilidades** clara entre componentes, servicios y lógica de negocio
- **Diseño responsivo** con Tailwind CSS
- **Estado global** manejado con React Context API

### Estructura de Directorios
```
src/
├── components/          # Componentes reutilizables organizados por dominio
│   ├── ui/             # Componentes UI básicos (Button, Input, etc.)
│   ├── layouts/        # Layouts principales (MainLayout, DashboardLayout)
│   ├── marketplace/    # Componentes específicos del marketplace
│   ├── auth/           # Componentes de autenticación
│   └── [domain]/       # Otros dominios específicos
├── pages/              # Páginas principales (una por archivo)
├── contexts/           # Context providers para estado global
├── services/           # Servicios para APIs y lógica de negocio
├── lib/                # Utilidades, configuraciones y tipos
├── types/              # Definiciones de tipos TypeScript
└── data/               # Datos de ejemplo y mocks
```

## 📝 Estándares de Código

### TypeScript
- **Usar TypeScript estrictamente** - no usar `any` sin justificación
- **Definir interfaces/tipos** para todas las props de componentes
- **Usar tipos genéricos** cuando sea apropiado
- **Exportar tipos** desde archivos dedicados en `/types`
- **Usar enums** para valores constantes (estados, categorías, etc.)

### React y Componentes
- **Usar Functional Components** con hooks
- **Props tipadas** con interfaces TypeScript
- **Componentes pequeños y enfocados** - máximo 200 líneas por componente
- **Usar React.memo()** para componentes que se re-renderizan frecuentemente
- **Implementar error boundaries** para manejo de errores
- **Usar lazy loading** para componentes pesados

### Nomenclatura
- **Componentes**: PascalCase (ej: `UserProfile.tsx`)
- **Archivos**: PascalCase para componentes, camelCase para utilidades
- **Variables/funciones**: camelCase
- **Constantes**: UPPER_SNAKE_CASE
- **Interfaces**: PascalCase con prefijo I (ej: `IUserProfile`)
- **Tipos**: PascalCase (ej: `UserStatus`)

### Estructura de Componentes
```typescript
// 1. Imports
import React from 'react';
import { ComponentProps } from './types';

// 2. Interfaces/Tipos
interface IComponentProps {
  // props aquí
}

// 3. Componente
export const Component: React.FC<IComponentProps> = ({ prop1, prop2 }) => {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Handlers
  const handleClick = () => {
    // lógica
  };
  
  // 6. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

## 🎨 Estilos y UI

### Tailwind CSS
- **Usar clases de Tailwind** en lugar de CSS personalizado
- **Crear componentes UI reutilizables** en `/components/ui`
- **Usar variables CSS** para colores y espaciados consistentes
- **Implementar diseño responsivo** con breakpoints de Tailwind
- **Usar dark mode** cuando sea apropiado

### Diseño Responsivo
- **Mobile-first approach** - diseñar primero para móvil
- **Breakpoints estándar**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Usar flexbox/grid** para layouts complejos
- **Optimizar imágenes** para diferentes tamaños de pantalla

## 🔐 Seguridad y Autenticación

### Supabase Auth
- **Usar Row Level Security (RLS)** en todas las tablas
- **Validar permisos** en el frontend y backend
- **Implementar refresh tokens** correctamente
- **Sanitizar inputs** antes de enviar a la base de datos
- **Usar variables de entorno** para configuraciones sensibles

### Validación de Datos
- **Validar en frontend** con bibliotecas como Zod o Yup
- **Validar en backend** con RLS policies
- **Sanitizar HTML** para prevenir XSS
- **Implementar rate limiting** para APIs

## 🗄️ Base de Datos y Supabase

### Estructura de Tablas
- **Usar UUIDs** como claves primarias
- **Implementar timestamps** (created_at, updated_at) en todas las tablas
- **Usar foreign keys** para relaciones
- **Indexar campos** frecuentemente consultados
- **Usar RLS policies** para seguridad

### Migraciones
- **Crear migraciones incrementales** en `/supabase/migrations`
- **Documentar cambios** en las migraciones
- **Probar migraciones** en entorno de desarrollo
- **Usar nombres descriptivos** para las migraciones

### Queries
- **Optimizar queries** con índices apropiados
- **Usar joins** en lugar de múltiples queries
- **Implementar paginación** para listas grandes
- **Usar prepared statements** para prevenir SQL injection

## 🚀 Performance y Optimización

### Rendimiento Frontend
- **Lazy loading** de componentes y rutas
- **Code splitting** por rutas
- **Optimizar imágenes** con formatos modernos (WebP, AVIF)
- **Usar React.memo()** para evitar re-renders innecesarios
- **Implementar virtualización** para listas largas

### Optimización de Bundle
- **Tree shaking** para eliminar código no usado
- **Minificar** CSS y JavaScript
- **Comprimir** assets estáticos
- **Usar CDN** para assets externos

### Caching
- **Implementar caching** en el cliente con React Query o SWR
- **Usar localStorage** para datos no sensibles
- **Cachear queries** de Supabase apropiadamente

## 📱 UX/UI y Accesibilidad

### Accesibilidad (a11y)
- **Usar semantic HTML** (nav, main, section, etc.)
- **Implementar ARIA labels** y roles
- **Soporte para navegación por teclado**
- **Contraste de colores** adecuado (WCAG 2.1)
- **Alt text** para imágenes

### Experiencia de Usuario
- **Loading states** para operaciones asíncronas
- **Error handling** con mensajes claros
- **Feedback visual** para acciones del usuario
- **Formularios intuitivos** con validación en tiempo real
- **Responsive design** en todos los dispositivos

## 🧪 Testing y Calidad

### Testing
- **Unit tests** para utilidades y hooks
- **Component tests** para componentes críticos
- **Integration tests** para flujos principales
- **E2E tests** para user journeys críticos

### Linting y Formateo
- **ESLint** para detectar errores y mantener consistencia
- **Prettier** para formateo de código
- **Husky** para pre-commit hooks
- **TypeScript strict mode** habilitado

## 📦 Gestión de Dependencias

### Dependencias
- **Mantener dependencias actualizadas** regularmente
- **Usar versiones específicas** en package.json
- **Auditar dependencias** regularmente
- **Preferir dependencias mantenidas** y populares

### Configuración
- **Usar Vite** como bundler principal
- **Configurar alias** para imports más limpios
- **Optimizar build** para producción
- **Usar environment variables** apropiadamente

## 🔄 Estado y Gestión de Datos

### Context API
- **Usar Context API** para estado global
- **Separar contextos** por dominio (Auth, Notifications, etc.)
- **Optimizar re-renders** con useMemo y useCallback
- **Documentar** la estructura del estado

### Servicios
- **Crear servicios** para lógica de negocio
- **Separar concerns** entre UI y lógica
- **Usar TypeScript** para APIs
- **Implementar error handling** consistente

## 📈 Escalabilidad

### Arquitectura Escalable
- **Modular design** para facilitar expansión
- **Micro-frontends** consideración futura
- **API versioning** para cambios breaking
- **Database sharding** preparación

### Performance
- **CDN** para assets estáticos
- **Database indexing** estratégico
- **Caching layers** (Redis, etc.)
- **Load balancing** preparación

## 🚨 Manejo de Errores

### Frontend
- **Error boundaries** para capturar errores de React
- **Try-catch** para operaciones asíncronas
- **Logging** de errores para debugging
- **User-friendly** mensajes de error

### Backend
- **RLS policies** para validación
- **Database constraints** para integridad
- **API error responses** consistentes
- **Monitoring** y alerting

## 📚 Documentación

### Código
- **JSDoc** para funciones complejas
- **README** actualizado para cada componente
- **Storybook** para componentes UI
- **API documentation** con ejemplos

### Proyecto
- **README.md** con setup instructions
- **CHANGELOG.md** para versiones
- **CONTRIBUTING.md** para contribuidores
- **Architecture decisions** documentadas

## 🔧 Configuración de Desarrollo

### Entorno Local
- **Node.js 18+** requerido
- **npm/yarn** para gestión de dependencias
- **Git** para control de versiones
- **VS Code** con extensiones recomendadas

### Variables de Entorno
```env
# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# External APIs
VITE_EXTERNAL_API_URL=
VITE_EXTERNAL_API_KEY=

# Feature Flags
VITE_ENABLE_FEATURE_X=true
```

## 🎯 Metas de Desarrollo

### Corto Plazo
- [ ] Implementar sistema de autenticación completo
- [ ] Crear marketplace funcional
- [ ] Sistema de valoraciones y reseñas
- [ ] Dashboard de usuario

### Mediano Plazo
- [ ] Sistema de mensajería en tiempo real
- [ ] Notificaciones push
- [ ] Sistema de pagos integrado
- [ ] Analytics y métricas

### Largo Plazo
- [ ] Aplicación móvil nativa
- [ ] API pública para desarrolladores
- [ ] Integración con herramientas de freelancers
- [ ] Marketplace internacional

## ⚠️ Anti-patrones a Evitar

- ❌ **No usar `any`** en TypeScript
- ❌ **No crear componentes monolíticos** (más de 200 líneas)
- ❌ **No hardcodear** valores sensibles
- ❌ **No ignorar** errores de linting
- ❌ **No usar** inline styles cuando se puede usar Tailwind
- ❌ **No crear** dependencias circulares
- ❌ **No usar** `console.log` en producción
- ❌ **No implementar** lógica de negocio en componentes

## 🎉 Conclusión

Este proyecto debe desarrollarse pensando en la escalabilidad y mantenibilidad a largo plazo. Cada decisión técnica debe considerar el impacto en el rendimiento, la experiencia del usuario y la capacidad de crecimiento de la plataforma.

**Recuerda**: La calidad del código es tan importante como la funcionalidad. Un código bien estructurado y documentado facilitará el mantenimiento y la expansión futura de Brisa.app. 