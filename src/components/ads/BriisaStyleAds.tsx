import React from 'react';
import { MapPin, Clock, Star, ExternalLink, CheckCircle, Award } from 'lucide-react';

interface BriisaStyleAdsProps {
  className?: string;
}

const BriisaStyleAds: React.FC<BriisaStyleAdsProps> = ({ className = '' }) => {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Anuncio Horizontal - Estilo Briisa */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
        <div className="flex items-center h-40">
          {/* Imagen a la izquierda */}
          <div className="w-48 h-full relative overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400" 
              alt="Desarrollo Web Profesional"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Desarrollo Web
              </span>
            </div>
          </div>
          
          {/* Contenido principal */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Desarrollo Web Completo con React & Node.js
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  Aplicaciones web modernas, responsivas y optimizadas. Desde landing pages hasta plataformas complejas con base de datos.
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>Entrega en 2-4 semanas</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    <span>Madrid, España</span>
                  </div>
                  <div className="flex items-center">
                    <Star size={14} className="mr-1 text-yellow-500 fill-current" />
                    <span>4.9 (127 reseñas)</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-blue-600">€1,200</span>
                    <span className="text-sm text-gray-500">/proyecto</span>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
                    Contactar
                    <ExternalLink size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Anuncio Vertical - Estilo Briisa */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 w-80 mx-auto">
        <div className="h-96 flex flex-col">
          {/* Imagen superior */}
          <div className="h-48 relative overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400" 
              alt="Diseño Gráfico Profesional"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Diseño Gráfico
              </span>
            </div>
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center">
              <Award size={12} className="text-yellow-500 mr-1" />
              <span className="text-xs font-semibold text-gray-800">TOP</span>
            </div>
          </div>
          
          {/* Contenido */}
          <div className="flex-1 p-4 flex flex-col">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Identidad Visual Completa
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                Logo, branding, tarjetas de visita y material corporativo. Diseño profesional que refleja la esencia de tu marca.
              </p>
              
              <div className="space-y-2 text-xs text-gray-500 mb-4">
                <div className="flex items-center">
                  <CheckCircle size={12} className="mr-2 text-green-500" />
                  <span>Logo en múltiples formatos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={12} className="mr-2 text-green-500" />
                  <span>Manual de marca incluido</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={12} className="mr-2 text-green-500" />
                  <span>Revisiones ilimitadas</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  <span>7-10 días</span>
                </div>
                <div className="flex items-center">
                  <Star size={12} className="mr-1 text-yellow-500 fill-current" />
                  <span>4.8 (89)</span>
                </div>
              </div>
            </div>
            
            {/* Precio y botón */}
            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-lg font-bold text-gray-900">€450</span>
                  <span className="text-sm text-gray-500 ml-1">/paquete</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={12} className="mr-1 text-gray-400" />
                  <span className="text-xs text-gray-500">Barcelona</span>
                </div>
              </div>
              
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center">
                Ver Portafolio
                <ExternalLink size={14} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BriisaStyleAds;