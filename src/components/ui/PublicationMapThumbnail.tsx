import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Importar iconos de Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Configurar iconos por defecto de Leaflet
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [20, 32], // Icono más pequeño para thumbnail
  iconAnchor: [10, 32],
  popupAnchor: [1, -34],
  shadowSize: [32, 32]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface ICoordinates {
  latitude: number;
  longitude: number;
}

interface IPublicationMapThumbnailProps {
  coordinates: ICoordinates;
  className?: string;
  height?: string;
}

export const PublicationMapThumbnail: React.FC<IPublicationMapThumbnailProps> = ({
  coordinates,
  className = '',
  height = '120px'
}) => {
  // Verificar que las coordenadas sean válidas
  const isValidCoordinates = (
    coordinates.latitude >= -90 && 
    coordinates.latitude <= 90 && 
    coordinates.longitude >= -180 && 
    coordinates.longitude <= 180
  );

  if (!isValidCoordinates) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`} style={{ height }}>
        <div className="text-center">
          <MapPin size={16} className="text-gray-400 mx-auto mb-1" />
          <span className="text-xs text-gray-500">Sin ubicación</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg overflow-hidden border border-gray-200 ${className}`} style={{ height }}>
      <MapContainer
        center={[coordinates.latitude, coordinates.longitude]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={false}
        touchZoom={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coordinates.latitude, coordinates.longitude]} />
      </MapContainer>
    </div>
  );
};

export default PublicationMapThumbnail; 