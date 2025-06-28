import React from 'react';
import { ExternalLink, Star, Clock, MapPin, TrendingUp, Users } from 'lucide-react';

interface MarketplaceAdProps {
  type: 'featured' | 'sidebar';
  className?: string;
}

const MarketplaceAd: React.FC<MarketplaceAdProps> = ({ type, className = '' }) => {
  if (type === 'featured') {
    // Anuncio destacado horizontal para la parte superior del marketplace
    return (
      <div className={`bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
        <div className="flex items-center h-32 md:h-36">
          {/* Contenido izquierdo */}
          <div className="flex-1 p-6 text-white">
            <div className="flex items-center mb-2">
              <span className="bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full mr-3 animate-pulse">
                ¡DESTACADO!
              </span>
              <div className="flex items-center text-cyan-200">
                <Star size={14} className="fill-current mr-1" />
                <span className="text-sm font-medium">4.9</span>
                <span className="text-xs ml-1">(127 reseñas)</span>
              </div>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
              Desarrollo Web Completo
            </h3>
            <p className="text-cyan-100 text-sm mb-3 line-clamp-2">
              Sitios web modernos y responsivos con React, Node.js y bases de datos. 
              Desde landing pages hasta aplicaciones complejas.
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-cyan-200 text-xs">
                <div className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  <span>Entrega en 7-14 días</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={12} className="mr-1" />
                  <span>Valencia, España</span>
                </div>
                <div className="flex items-center">
                  <Users size={12} className="mr-1" />
                  <span>+50 proyectos</span>
                </div>
              </div>
              <button className="bg-white text-teal-700 px-6 py-2 rounded-lg text-sm font-semibold hover:bg-cyan-50 transition-colors flex items-center shadow-md">
                Ver Detalles
                <ExternalLink size={14} className="ml-2" />
              </button>
            </div>
          </div>
          
          {/* Imagen derecha */}
          <div className="w-36 md:w-44 h-full relative overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=400" 
              alt="Desarrollo Web"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-teal-700/30"></div>
            
            {/* Badge de precio */}
            <div className="absolute top-3 right-3 bg-white text-teal-700 px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
              Desde €599
            </div>
            
            {/* Badge de tendencia */}
            <div className="absolute bottom-3 right-3 bg-orange-400 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
              <TrendingUp size={12} className="mr-1" />
              Trending
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Anuncio vertical para sidebar
  return (
    <div className={`bg-gradient-to-b from-purple-600 via-purple-700 to-indigo-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
      <div className="h-80 flex flex-col">
        {/* Imagen superior */}
        <div className="h-36 relative overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400" 
            alt="Diseño Gráfico"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-700/70 to-transparent"></div>
          
          {/* Badge superior */}
          <div className="absolute top-3 left-3 bg-yellow-400 text-purple-900 px-2 py-1 rounded-full text-xs font-bold">
            PREMIUM
          </div>
          
          {/* Rating */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center">
            <Star size={12} className="text-yellow-500 fill-current mr-1" />
            <span className="text-xs font-semibold text-gray-800">4.8</span>
          </div>
        </div>
        
        {/* Contenido */}
        <div className="flex-1 p-4 text-white flex flex-col">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2 leading-tight">
              Diseño Gráfico Profesional
            </h3>
            <p className="text-purple-100 text-sm mb-3 line-clamp-3">
              Logotipos, branding, material promocional y diseño editorial. 
              Creatividad que impulsa tu marca.
            </p>
            
            <div className="space-y-2 text-xs text-purple-200">
              <div className="flex items-center">
                <Clock size={12} className="mr-2" />
                <span>Entrega en 3-5 días</span>
              </div>
              <div className="flex items-center">
                <MapPin size={12} className="mr-2" />
                <span>Sevilla, España</span>
              </div>
              <div className="flex items-center">
                <Users size={12} className="mr-2" />
                <span>+200 diseños creados</span>
              </div>
            </div>
          </div>
          
          {/* Sección inferior */}
          <div className="mt-4 pt-3 border-t border-purple-400/30">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-white text-lg font-bold">€149</span>
                <span className="text-purple-200 text-xs ml-1">por diseño</span>
              </div>
              <span className="bg-yellow-400 text-purple-900 text-xs px-2 py-1 rounded-full font-semibold">
                TOP RATED
              </span>
            </div>
            
            <button className="w-full bg-white text-purple-700 py-2 rounded-lg text-sm font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center">
              Contactar Ahora
              <ExternalLink size={14} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceAd;