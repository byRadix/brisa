# Sistema de Palabras Clave - Brisa.app

## 📋 Descripción General

El sistema de palabras clave en Brisa.app es una funcionalidad avanzada que permite a los usuarios configurar alertas personalizadas basadas en términos específicos, similar al sistema de "Chollometro". Este sistema mejora significativamente la experiencia del usuario al proporcionar notificaciones relevantes y personalizadas.

## 🏗️ Arquitectura del Sistema

### Estructura de Datos

```typescript
// Interfaz de publicación con palabras clave
export interface SamplePublication {
  // ... otras propiedades
  keywords: string[]; // Array de palabras clave descriptivas
}

// Interfaz de alerta de usuario
interface KeywordAlert {
  id: string;
  keyword: string;
  createdAt: Date;
  isActive: boolean;
}
```

### Componentes Principales

1. **KeywordsDisplay** - Visualización de palabras clave en diferentes formatos
2. **KeywordAlerts** - Gestión de alertas de usuario
3. **Funciones de utilidad** - Búsqueda, filtrado y análisis de palabras clave

## 🎯 Funcionalidades Implementadas

### 1. Visualización de Palabras Clave

#### KeywordsDisplay
- **Props**: `keywords`, `maxDisplay`, `showAll`, `className`
- **Variantes**:
  - `KeywordsDisplay`: Badges circulares azules
  - `KeywordsBadges`: Badges pequeños con borde
  - `KeywordsList`: Lista completa con contador

#### Uso en Tarjetas
```typescript
<KeywordsBadges 
  keywords={publication.keywords} 
  maxDisplay={4}
  className="mb-3"
/>
```

#### Uso en Vista de Detalle
```typescript
<KeywordsList 
  keywords={publication.keywords} 
  maxDisplay={15}
  showAll={true}
/>
```

### 2. Sistema de Alertas de Usuario

#### Características Principales
- **Persistencia**: Almacenamiento en localStorage
- **Sugerencias**: Autocompletado inteligente
- **Palabras populares**: Sugerencias basadas en frecuencia
- **Gestión**: Activar/desactivar/eliminar alertas

#### Funcionalidades
```typescript
// Agregar nueva alerta
const addAlert = (keyword: string) => { /* ... */ };

// Activar/desactivar alerta
const toggleAlert = (id: string) => { /* ... */ };

// Eliminar alerta
const removeAlert = (id: string) => { /* ... */ };
```

### 3. Funciones de Utilidad

#### Búsqueda y Filtrado
```typescript
// Buscar publicaciones por palabras clave
searchPublicationsByKeywords(keywords: string[], exactMatch: boolean)

// Filtrar publicaciones con múltiples criterios
filterPublications(filters: {
  keywords?: string[];
  modality?: PublicationModality;
  // ... otros filtros
})

// Verificar coincidencia con alertas de usuario
checkPublicationMatchesUserKeywords(publication, userKeywords)
```

#### Análisis de Datos
```typescript
// Obtener todas las palabras clave únicas
getAllUniqueKeywords(): string[]

// Obtener palabras clave más populares
getMostPopularKeywords(limit: number): Array<{keyword: string, count: number}>

// Obtener sugerencias de búsqueda
getKeywordSuggestions(searchTerm: string, limit: number): string[]
```

## 📊 Datos de Ejemplo

### Palabras Clave por Categoría

#### Electrónicos (iPhone)
```typescript
keywords: [
  "iphone", "iphone 13", "iphone 13 pro max", "apple", "smartphone", "móvil", "celular",
  "pantalla", "reparación", "técnico", "servicio técnico", "apple store", "mojado", "agua",
  "piscina", "daño por agua", "pantalla negra", "encendido", "llamadas", "electrónicos"
]
```

#### Hostelería (Camarero/Cocinero)
```typescript
keywords: [
  "camarero", "cocinero", "chef", "hostelería", "restaurante", "catering", "eventos",
  "cumpleaños", "barbacoa", "pizza", "horno", "servicio", "domingo", "urgente",
  "trabajo temporal", "evento", "fiesta", "comida", "gastronomía", "servicio de mesa"
]
```

#### Tecnología (Desarrollador Frontend)
```typescript
keywords: [
  "desarrollador", "frontend", "react", "typescript", "javascript", "programador",
  "desarrollo web", "e-commerce", "tienda online", "componentes", "api", "apis",
  "optimización", "rendimiento", "proyecto", "remoto", "teletrabajo", "freelance",
  "programación", "web", "front-end", "front end", "reactjs", "ts", "js"
]
```

## 🔧 Integración en Componentes

### Tarjetas de Publicación
- **Ubicación**: Después de la descripción
- **Formato**: Badges pequeños (máximo 4)
- **Estilo**: Indigo con borde

### Vista de Detalle
- **Ubicación**: Después de la descripción
- **Formato**: Lista completa con contador
- **Estilo**: Verde con hover effects

### Sistema de Alertas
- **Ubicación**: Panel lateral o página dedicada
- **Funcionalidad**: Gestión completa de alertas
- **Persistencia**: localStorage

## 🎨 Estilos y UX

### Paleta de Colores
- **KeywordsDisplay**: Azul (`bg-blue-100 text-blue-800`)
- **KeywordsBadges**: Índigo (`bg-indigo-50 text-indigo-700`)
- **KeywordsList**: Verde (`bg-green-100 text-green-800`)

### Estados Interactivos
- **Hover**: Cambio de color de fondo
- **Tooltip**: Información completa en hover
- **Contador**: Indicador de elementos adicionales

### Responsive Design
- **Flexbox**: Layout flexible para diferentes tamaños
- **Gap**: Espaciado consistente entre elementos
- **Wrap**: Envolvimiento automático en pantallas pequeñas

## 🚀 Beneficios del Sistema

### Para Usuarios
1. **Notificaciones Personalizadas**: Reciben alertas relevantes
2. **Descubrimiento**: Encuentran servicios específicos fácilmente
3. **Eficiencia**: Ahorran tiempo en búsquedas
4. **Relevancia**: Contenido adaptado a sus intereses

### Para la Plataforma
1. **Engagement**: Mayor tiempo de permanencia
2. **Retención**: Usuarios más satisfechos
3. **Datos**: Información valiosa sobre preferencias
4. **Diferenciación**: Funcionalidad única en el mercado

## 🔮 Futuras Mejoras

### Funcionalidades Planificadas
1. **Notificaciones Push**: Alertas en tiempo real
2. **Análisis Avanzado**: Machine learning para sugerencias
3. **Categorización Automática**: IA para asignar keywords
4. **Filtros Combinados**: Múltiples criterios simultáneos

### Optimizaciones Técnicas
1. **Indexación**: Base de datos optimizada para búsquedas
2. **Caching**: Almacenamiento en memoria para consultas frecuentes
3. **API REST**: Endpoints para gestión de alertas
4. **WebSockets**: Notificaciones en tiempo real

## 📝 Consideraciones Técnicas

### Performance
- **Lazy Loading**: Carga diferida de sugerencias
- **Debouncing**: Optimización de búsquedas en tiempo real
- **Memoización**: Cache de resultados frecuentes

### Seguridad
- **Sanitización**: Limpieza de inputs de usuario
- **Validación**: Verificación de datos antes de procesar
- **Rate Limiting**: Protección contra spam

### Accesibilidad
- **ARIA Labels**: Etiquetas para lectores de pantalla
- **Navegación por Teclado**: Soporte completo
- **Contraste**: Colores accesibles según WCAG

## 🧪 Testing

### Casos de Prueba
1. **Búsqueda**: Verificar coincidencias exactas y parciales
2. **Alertas**: Probar creación, activación y eliminación
3. **Persistencia**: Verificar guardado en localStorage
4. **Sugerencias**: Probar autocompletado y palabras populares

### Métricas de Rendimiento
- **Tiempo de Respuesta**: < 100ms para búsquedas
- **Precisión**: > 90% de coincidencias relevantes
- **Usabilidad**: < 3 clics para configurar alerta

## 📚 Referencias

- [Chollometro Alertas](https://www.chollometro.com/alertas) - Inspiración del sistema
- [React Hooks](https://reactjs.org/docs/hooks-intro.html) - Gestión de estado
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Tailwind CSS](https://tailwindcss.com/) - Estilos utilitarios

---

**Nota**: Este sistema está diseñado para ser escalable y mantenible, siguiendo las mejores prácticas de desarrollo moderno y las reglas establecidas en el proyecto Brisa.app. 