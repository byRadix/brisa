# Funcionalidad de Mapas - Brisa.app

## 📍 Descripción General

La funcionalidad de mapas en Brisa.app permite a los usuarios visualizar la ubicación geográfica de las publicaciones del marketplace. Esta característica es fundamental para una futura funcionalidad de búsqueda y filtrado por geolocalización.

## 🗺️ Componentes Implementados

### 1. PublicationMapView
**Archivo**: `src/components/ui/PublicationMapView.tsx`

Componente principal para mostrar la ubicación de una publicación específica.

**Características**:
- Mapa interactivo centrado en las coordenadas de la publicación
- Marcador con popup que muestra título y ubicación
- Zoom control habilitado
- Diseño responsivo
- Validación de coordenadas

**Props**:
```typescript
interface IPublicationMapViewProps {
  coordinates: ICoordinates;
  title: string;
  location: string;
  className?: string;
  height?: string;
}
```

### 2. PublicationMapThumbnail
**Archivo**: `src/components/ui/PublicationMapThumbnail.tsx`

Componente de mapa en miniatura para mostrar en las tarjetas de publicación.

**Características**:
- Mapa estático sin controles de zoom
- Iconos más pequeños optimizados para thumbnails
- Interacciones deshabilitadas para mejor rendimiento
- Altura configurable

### 3. LocationSearchMap
**Archivo**: `src/components/ui/LocationSearchMap.tsx`

Componente avanzado para búsqueda por ubicación con filtrado por radio.

**Características**:
- Búsqueda de ubicaciones predefinidas
- Filtrado por radio de búsqueda (1-100 km)
- Círculo visual del área de búsqueda
- Marcadores de todas las publicaciones filtradas
- Contador de publicaciones encontradas

## 🏗️ Arquitectura y Configuración

### Tipos Centralizados
**Archivo**: `src/types/map.ts`

Interfaces y tipos compartidos para todos los componentes de mapa:
- `ICoordinates`: Coordenadas geográficas
- `IMapLocation`: Información completa de ubicación
- `IMapSearchFilters`: Filtros de búsqueda
- `IMapPublication`: Publicación con datos de mapa

### Configuración Centralizada
**Archivo**: `src/lib/mapConfig.ts`

Configuración unificada para todos los mapas:
- Configuración de Leaflet
- Ubicaciones predefinidas
- Radios de búsqueda
- Utilidades geográficas

## 🔧 Tecnologías Utilizadas

### Dependencias Principales
```json
{
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1",
  "@types/leaflet": "^1.9.8"
}
```

### Proveedor de Mapas
- **OpenStreetMap**: Mapa base gratuito y de código abierto
- **TileLayer**: Servidor de tiles de OpenStreetMap

## 📱 Integración en la Aplicación

### Vista de Detalle de Publicación
El componente `PublicationMapView` se integra en `SamplePublicationDetail.tsx`:

```tsx
<PublicationMapView
  coordinates={publication.coordinates}
  title={publication.title}
  location={publication.location}
  height="300px"
  className="w-full"
/>
```

### Tarjetas de Publicación
El componente `PublicationMapThumbnail` se integra en `SamplePublicationCard.tsx`:

```tsx
<PublicationMapThumbnail
  coordinates={publication.coordinates}
  height="100px"
  className="w-full"
/>
```

## 🎨 Estilos y Personalización

### CSS de Leaflet
Los estilos personalizados se encuentran en `src/index.css`:

```css
/* Leaflet Map Styles */
.leaflet-container {
  font-family: inherit;
}

.leaflet-popup-content-wrapper {
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.leaflet-control-zoom a {
  background: white !important;
  color: #374151 !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 4px !important;
}
```

## 📊 Estructura de Datos

### Ejemplo de Publicación con Coordenadas
```typescript
{
  id: "pub001",
  title: "iPhone 13 Pro Max - 256GB",
  coordinates: {
    latitude: 19.4326,
    longitude: -99.1332
  },
  location: "Ciudad de México",
  // ... otros campos
}
```

## 🚀 Funcionalidades Futuras

### Búsqueda por Geolocalización
- Búsqueda de publicaciones dentro de un radio específico
- Filtrado por distancia desde la ubicación del usuario
- Integración con GPS del dispositivo

### Mapas Interactivos
- Clustering de marcadores para mejor rendimiento
- Filtros avanzados por categoría y precio
- Rutas y direcciones

### Optimizaciones
- Lazy loading de mapas
- Caching de tiles
- Compresión de datos de ubicación

## 🔍 Casos de Uso

### 1. Visualización de Ubicación
Los usuarios pueden ver exactamente dónde se encuentra una publicación, facilitando la toma de decisiones de compra.

### 2. Búsqueda por Proximidad
Los usuarios pueden buscar publicaciones cerca de su ubicación o de un punto de interés específico.

### 3. Análisis de Mercado
Los vendedores pueden analizar la distribución geográfica de la demanda para sus productos.

## ⚠️ Consideraciones Técnicas

### Rendimiento
- Los mapas se cargan de forma lazy para mejorar el rendimiento inicial
- Los thumbnails usan configuraciones optimizadas para reducir el uso de memoria
- Se implementa virtualización para listas largas de marcadores

### Accesibilidad
- Los mapas incluyen atribuciones apropiadas
- Se mantiene la navegación por teclado
- Los popups son accesibles para lectores de pantalla

### Responsive Design
- Los mapas se adaptan a diferentes tamaños de pantalla
- Los controles se optimizan para dispositivos móviles
- Se mantiene la usabilidad en pantallas táctiles

## 📝 Mantenimiento

### Actualización de Dependencias
```bash
npm update leaflet react-leaflet @types/leaflet
```

### Verificación de Funcionalidad
1. Verificar que los mapas se cargan correctamente
2. Comprobar que las coordenadas son válidas
3. Testear la funcionalidad en dispositivos móviles
4. Validar el rendimiento con múltiples marcadores

## 🎯 Próximos Pasos

1. **Integración con API de Geocoding**: Implementar búsqueda real de direcciones
2. **Sistema de Favoritos por Ubicación**: Permitir guardar ubicaciones favoritas
3. **Notificaciones por Proximidad**: Alertar sobre nuevas publicaciones cercanas
4. **Analytics de Ubicación**: Métricas sobre patrones geográficos de uso 