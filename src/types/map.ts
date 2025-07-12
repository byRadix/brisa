export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface IMapLocation {
  coordinates: ICoordinates;
  address: string;
  city: string;
  country: string;
}

export interface IMapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface IMapSearchFilters {
  radius: number; // en kilómetros
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  condition?: string;
}

export interface IMapPublication {
  id: string;
  title: string;
  coordinates: ICoordinates;
  location: string;
  category: string;
  price: number;
  condition: string;
  images: string[];
}

export type MapZoomLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

export interface IMapConfig {
  defaultCenter: ICoordinates;
  defaultZoom: MapZoomLevel;
  maxZoom: MapZoomLevel;
  minZoom: MapZoomLevel;
  tileLayerUrl: string;
  attribution: string;
} 