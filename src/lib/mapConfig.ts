import { IMapConfig } from '../types/map';

export const mapConfig: IMapConfig = {
  defaultCenter: {
    latitude: 19.4326, // Ciudad de México
    longitude: -99.1332
  },
  defaultZoom: 10,
  maxZoom: 18,
  minZoom: 3,
  tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};

// Configuración de iconos de Leaflet
export const leafletIconConfig = {
  default: {
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  },
  thumbnail: {
    iconSize: [20, 32],
    iconAnchor: [10, 32],
    popupAnchor: [1, -34],
    shadowSize: [32, 32]
  }
};

// Ubicaciones predefinidas para búsqueda rápida
export const predefinedLocations = {
  'ciudad de mexico': {
    latitude: 19.4326,
    longitude: -99.1332,
    name: 'Ciudad de México'
  },
  'guadalajara': {
    latitude: 20.6597,
    longitude: -103.3496,
    name: 'Guadalajara'
  },
  'monterrey': {
    latitude: 25.6866,
    longitude: -100.3161,
    name: 'Monterrey'
  },
  'lorca': {
    latitude: 37.6711,
    longitude: -1.7017,
    name: 'Lorca'
  },
  'madrid': {
    latitude: 40.4168,
    longitude: -3.7038,
    name: 'Madrid'
  },
  'barcelona': {
    latitude: 41.3851,
    longitude: 2.1734,
    name: 'Barcelona'
  }
};

// Radios de búsqueda predefinidos (en kilómetros)
export const searchRadii = [
  { value: 1, label: '1 km' },
  { value: 5, label: '5 km' },
  { value: 10, label: '10 km' },
  { value: 25, label: '25 km' },
  { value: 50, label: '50 km' },
  { value: 100, label: '100 km' }
];

// Utilidades para cálculos geográficos
export const geoUtils = {
  // Calcular distancia entre dos puntos usando la fórmula de Haversine
  calculateDistance: (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  },

  // Verificar si las coordenadas son válidas
  isValidCoordinates: (latitude: number, longitude: number): boolean => {
    return (
      latitude >= -90 && 
      latitude <= 90 && 
      longitude >= -180 && 
      longitude <= 180
    );
  },

  // Obtener el nivel de zoom apropiado para un radio de búsqueda
  getZoomForRadius: (radiusKm: number): number => {
    if (radiusKm <= 1) return 15;
    if (radiusKm <= 5) return 13;
    if (radiusKm <= 10) return 12;
    if (radiusKm <= 25) return 11;
    if (radiusKm <= 50) return 10;
    return 9;
  }
}; 