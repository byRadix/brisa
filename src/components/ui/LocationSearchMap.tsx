import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMap, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Search, X } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Importar iconos de Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Configurar iconos por defecto de Leaflet
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface ICoordinates {
  latitude: number;
  longitude: number;
}

interface IPublication {
  id: string;
  title: string;
  coordinates: ICoordinates;
  location: string;
}

interface ILocationSearchMapProps {
  publications: IPublication[];
  onLocationSelect?: (coordinates: ICoordinates, radius: number) => void;
  className?: string;
  height?: string;
}

// Componente para manejar el cambio de vista del mapa
const MapController: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  
  React.useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
};

export const LocationSearchMap: React.FC<ILocationSearchMapProps> = ({
  publications,
  onLocationSelect,
  className = '',
  height = '500px'
}) => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<ICoordinates | null>(null);
  const [searchRadius, setSearchRadius] = useState(5); // km
  const [mapCenter, setMapCenter] = useState<[number, number]>([19.4326, -99.1332]); // CDMX por defecto
  const [mapZoom, setMapZoom] = useState(10);
  const mapRef = useRef<L.Map | null>(null);

  // Filtrar publicaciones dentro del radio seleccionado
  const filteredPublications = selectedLocation 
    ? publications.filter(pub => {
        const distance = calculateDistance(
          selectedLocation.latitude,
          selectedLocation.longitude,
          pub.coordinates.latitude,
          pub.coordinates.longitude
        );
        return distance <= searchRadius;
      })
    : publications;

  // Calcular distancia entre dos puntos (fórmula de Haversine)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Buscar ubicación (simulado - en producción usarías un servicio de geocoding)
  const handleSearch = () => {
    // Simulación de búsqueda - en producción usarías Google Maps API o similar
    const mockLocations: { [key: string]: ICoordinates } = {
      'ciudad de mexico': { latitude: 19.4326, longitude: -99.1332 },
      'guadalajara': { latitude: 20.6597, longitude: -103.3496 },
      'monterrey': { latitude: 25.6866, longitude: -100.3161 },
      'lorca': { latitude: 37.6711, longitude: -1.7017 }
    };

    const location = mockLocations[searchLocation.toLowerCase()];
    if (location) {
      setSelectedLocation(location);
      setMapCenter([location.latitude, location.longitude]);
      setMapZoom(12);
      onLocationSelect?.(location, searchRadius);
    }
  };

  // Limpiar búsqueda
  const clearSearch = () => {
    setSearchLocation('');
    setSelectedLocation(null);
    setMapCenter([19.4326, -99.1332]);
    setMapZoom(10);
  };

  return (
    <div className={`rounded-lg overflow-hidden border border-gray-200 ${className}`} style={{ height }}>
      {/* Search Controls */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar ubicación..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              {searchLocation && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Radio:</label>
              <select
                value={searchRadius}
                onChange={(e) => setSearchRadius(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={1}>1 km</option>
                <option value={5}>5 km</option>
                <option value={10}>10 km</option>
                <option value={25}>25 km</option>
                <option value={50}>50 km</option>
              </select>
            </div>
            
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Buscar
            </button>
          </div>
        </div>
        
        {selectedLocation && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin size={16} className="text-blue-600 mr-2" />
                <span className="text-sm text-blue-800">
                  Ubicación seleccionada: {searchLocation}
                </span>
              </div>
              <span className="text-sm text-blue-600 font-medium">
                {filteredPublications.length} publicaciones encontradas
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Map */}
      <div className="relative" style={{ height: 'calc(100% - 120px)' }}>
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
          scrollWheelZoom={true}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapController center={mapCenter} zoom={mapZoom} />
          
          {/* Círculo de búsqueda */}
          {selectedLocation && (
            <Circle
              center={[selectedLocation.latitude, selectedLocation.longitude]}
              radius={searchRadius * 1000} // Convertir km a metros
              pathOptions={{
                color: '#3B82F6',
                fillColor: '#3B82F6',
                fillOpacity: 0.1,
                weight: 2
              }}
            />
          )}
          
          {/* Marcadores de publicaciones */}
          {filteredPublications.map((pub) => (
            <Marker
              key={pub.id}
              position={[pub.coordinates.latitude, pub.coordinates.longitude]}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800 text-sm">{pub.title}</h3>
                  <p className="text-xs text-gray-600">{pub.location}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationSearchMap; 