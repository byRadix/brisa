import React, { useState } from 'react';
import { Eye, Palette, Code, Layout, Smartphone, Monitor } from 'lucide-react';
import BriisaStyleAds from './BriisaStyleAds';

const AdComparison: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'desktop' | 'mobile'>('desktop');

  const designSpecs = {
    horizontal: {
      title: 'Anuncio Horizontal - Estilo Briisa',
      dimensions: '448x160px',
      description: 'Diseño limpio y profesional siguiendo la estética de Briisa.app',
      features: [
        'Imagen destacada a la izquierda (192px de ancho)',
        'Contenido organizado en jerarquía clara',
        'Información de contacto y ubicación visible',
        'Rating y reseñas para generar confianza',
        'Precio prominente con call-to-action',
        'Badges de categoría para identificación rápida'
      ],
      colors: 'Azul corporativo (#3B82F6) con acentos grises',
      layout: 'Flex horizontal con imagen fija y contenido flexible'
    },
    vertical: {
      title: 'Anuncio Vertical - Estilo Briisa',
      dimensions: '320x384px',
      description: 'Formato vertical optimizado para feeds y sidebars',
      features: [
        'Imagen hero superior (192px de altura)',
        'Contenido estructurado en secciones claras',
        'Lista de beneficios con iconos de verificación',
        'Información de entrega y rating',
        'Precio y ubicación en footer',
        'Botón de acción de ancho completo'
      ],
      colors: 'Púrpura (#7C3AED) con elementos de confianza',
      layout: 'Flex vertical con imagen superior y contenido apilado'
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Anuncios Estilo Briisa.app
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Anuncios publicitarios diseñados siguiendo la estética y principios de diseño de Briisa.app. 
          Información inventada para pruebas y demostración.
        </p>
      </div>

      {/* Device View Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-lg flex">
          <button
            onClick={() => setSelectedView('desktop')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
              selectedView === 'desktop'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Monitor size={16} className="mr-2" />
            Desktop
          </button>
          <button
            onClick={() => setSelectedView('mobile')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
              selectedView === 'mobile'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Smartphone size={16} className="mr-2" />
            Mobile
          </button>
        </div>
      </div>

      {/* Ads Preview */}
      <div className="bg-gray-50 p-8 rounded-xl">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center text-gray-600">
            <Eye size={20} className="mr-2" />
            <span className="font-medium">Vista Previa - {selectedView === 'desktop' ? 'Escritorio' : 'Móvil'}</span>
          </div>
        </div>
        
        <div className={`${selectedView === 'mobile' ? 'max-w-sm mx-auto' : ''}`}>
          <BriisaStyleAds />
        </div>
      </div>

      {/* Design Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Horizontal Ad Analysis */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Layout className="mr-2" size={20} />
            {designSpecs.horizontal.title}
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Especificaciones</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Dimensiones:</strong> {designSpecs.horizontal.dimensions}</p>
                <p><strong>Colores:</strong> {designSpecs.horizontal.colors}</p>
                <p><strong>Layout:</strong> {designSpecs.horizontal.layout}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Características</h4>
              <ul className="space-y-1">
                {designSpecs.horizontal.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Vertical Ad Analysis */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Smartphone className="mr-2" size={20} />
            {designSpecs.vertical.title}
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Especificaciones</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Dimensiones:</strong> {designSpecs.vertical.dimensions}</p>
                <p><strong>Colores:</strong> {designSpecs.vertical.colors}</p>
                <p><strong>Layout:</strong> {designSpecs.vertical.layout}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Características</h4>
              <ul className="space-y-1">
                {designSpecs.vertical.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Design Principles */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Palette className="mr-2" size={24} />
          Principios de Diseño Aplicados
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Eye size={24} className="text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Consistencia Visual</h4>
            <p className="text-gray-600 text-sm">
              Colores, tipografías y espaciado coherentes con la marca Briisa.app
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Code size={24} className="text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Información Clara</h4>
            <p className="text-gray-600 text-sm">
              Datos relevantes organizados: precio, ubicación, rating y tiempo de entrega
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Layout size={24} className="text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Responsive Design</h4>
            <p className="text-gray-600 text-sm">
              Adaptable a diferentes dispositivos manteniendo la legibilidad
            </p>
          </div>
        </div>
      </div>

      {/* Usage Notes */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Notas de Implementación
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">Datos Ficticios Incluidos:</h4>
            <ul className="space-y-1">
              <li>• Precios y servicios inventados</li>
              <li>• Ubicaciones de ejemplo (Madrid, Barcelona)</li>
              <li>• Ratings y reseñas simuladas</li>
              <li>• Tiempos de entrega aproximados</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Elementos Personalizables:</h4>
            <ul className="space-y-1">
              <li>• Imágenes de servicios reales</li>
              <li>• Información de contacto real</li>
              <li>• Precios y condiciones actuales</li>
              <li>• Badges de categorías específicas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdComparison;