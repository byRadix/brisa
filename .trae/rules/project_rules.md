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