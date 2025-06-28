import React from 'react';
import { ExternalLink, Star, Clock, MapPin } from 'lucide-react';

interface AdBannerProps {
  type: 'horizontal' | 'vertical';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ type, className = '' }) => {
  if (type === 'horizontal') {
    return (
      <div className={`bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
        <div className="flex items-center h-32 md:h-40">
          {/* Left Content */}
          <div className="flex-1 p-6 text-white">
            <div className="flex items-center mb-2">
              <span className="bg-yellow-400 text-purple-900 text-xs font-bold px-2 py-1 rounded-full mr-2">
                PREMIUM
              </span>
              <div className="flex items-center text-yellow-300">
                <Star size={14} className="fill-current mr-1" />
                <span className="text-sm font-medium">4.9</span>
              </div>
            </div>
            
            <h3 className="text-lg md:text-xl font-bold mb-1 leading-tight">
              Diseño UX/UI Profesional
            </h3>
            <p className="text-purple-100 text-sm mb-3 line-clamp-2">
              Interfaces modernas que convierten visitantes en clientes. Experiencia garantizada.
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-purple-200 text-xs">
                <Clock size={12} className="mr-1" />
                <span>Entrega en 5 días</span>
                <MapPin size={12} className="ml-3 mr-1" />
                <span>Madrid, España</span>
              </div>
              <button className="bg-white text-purple-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-50 transition-colors flex items-center">
                Ver Más
                <ExternalLink size={14} className="ml-1" />
              </button>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="w-32 md:w-40 h-full relative overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400" 
              alt="Diseño UX/UI"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-purple-700/20"></div>
            
            {/* Price Badge */}
            <div className="absolute top-2 right-2 bg-white text-purple-700 px-2 py-1 rounded-lg text-xs font-bold shadow-md">
              Desde €299
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vertical Ad
  return (
    <div className={`bg-gradient-to-b from-emerald-500 via-teal-600 to-cyan-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
      <div className="h-80 md:h-96 flex flex-col">
        {/* Top Image */}
        <div className="h-40 relative overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400" 
            alt="Marketing Digital"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/60 to-transparent"></div>
          
          {/* Top Badge */}
          <div className="absolute top-3 left-3 bg-orange-400 text-white px-2 py-1 rounded-full text-xs font-bold">
            ¡OFERTA!
          </div>
          
          {/* Rating */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center">
            <Star size={12} className="text-yellow-500 fill-current mr-1" />
            <span className="text-xs font-semibold text-gray-800">4.8</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-4 text-white flex flex-col">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2 leading-tight">
              Marketing Digital Completo
            </h3>
            <p className="text-emerald-100 text-sm mb-3 line-clamp-3">
              Estrategia integral: SEO, SEM, redes sociales y email marketing. 
              Resultados medibles en 30 días.
            </p>
            
            <div className="space-y-2 text-xs text-emerald-200">
              <div className="flex items-center">
                <Clock size={12} className="mr-2" />
                <span>Proyecto de 4 semanas</span>
              </div>
              <div className="flex items-center">
                <MapPin size={12} className="mr-2" />
                <span>Barcelona, España</span>
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="mt-4 pt-3 border-t border-emerald-400/30">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-emerald-200 text-xs line-through">€1,200</span>
                <span className="text-white text-lg font-bold ml-2">€899</span>
              </div>
              <span className="bg-orange-400 text-white text-xs px-2 py-1 rounded-full font-semibold">
                -25%
              </span>
            </div>
            
            <button className="w-full bg-white text-emerald-700 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center">
              Contratar Ahora
              <ExternalLink size={14} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;