import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
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

interface IPublicationMapViewProps {
  coordinates: ICoordinates;
  title: string;
  location: string;
  className?: string;
  height?: string;
}

export const PublicationMapView: React.FC<IPublicationMapViewProps> = ({
  coordinates,
  title,
  location,
  className = '',
  height = '400px'
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
      <div className={`bg-gray-100 rounded-lg p-4 text-center ${className}`} style={{ height }}>
        <p className="text-gray-500">Ubicación no disponible</p>
      </div>
    );
  }

  return (
    <div className={`rounded-lg overflow-hidden border border-gray-200 ${className}`} style={{ height }}>
      <MapContainer
        center={[coordinates.latitude, coordinates.longitude]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={true}
        touchZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coordinates.latitude, coordinates.longitude]}>
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold text-gray-800">{title}</h3>
              <p className="text-sm text-gray-600">{location}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default PublicationMapView; 