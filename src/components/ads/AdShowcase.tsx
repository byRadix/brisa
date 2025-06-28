import React, { useState } from 'react';
import { Eye, Code, Palette, BarChart3, Camera, Megaphone } from 'lucide-react';
import AdBanner from './AdBanner';

const AdShowcase: React.FC = () => {
  const [selectedAd, setSelectedAd] = useState<'horizontal' | 'vertical'>('horizontal');

  const designElements = {
    horizontal: {
      title: 'Anuncio Horizontal (Landscape)',
      dimensions: '400x160px',
      description: 'Ideal para banners superiores, secciones de contenido y espacios amplios',
      features: [
        'Diseño en dos columnas: contenido + imagen',
        'Jerarquía visual clara con título prominente',
        'Información secundaria organizada',
        'Call-to-action destacado',
        'Gradiente direccional que guía la vista'
      ],
      colorScheme: 'Púrpura a Índigo (profesional y premium)',
      typography: 'Títulos bold, texto secundario ligero',
      layout: 'Flex horizontal con imagen a la derecha'
    },
    vertical: {
      title: 'Anuncio Vertical (Portrait)',
      dimensions: '300x384px',
      description: 'Perfecto para sidebars, feeds móviles y espacios verticales',
      features: [
        'Estructura en tres secciones: imagen, contenido, acción',
        'Imagen hero en la parte superior',
        'Contenido organizado verticalmente',
        'Precio con descuento destacado',
        'Botón de acción de ancho completo'
      ],
      colorScheme: 'Esmeralda a Cian (fresco y confiable)',
      typography: 'Jerarquía clara con diferentes tamaños',
      layout: 'Flex vertical con imagen superior'
    }
  };

  const currentDesign = designElements[selectedAd];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Anuncios Publicitarios de Muestra
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Ejemplos de diseño y maquetación para diferentes formatos publicitarios. 
          Cada anuncio demuestra principios de diseño como jerarquía visual, contraste y balance.
        </p>
      </div>

      {/* Ad Type Selector */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-lg flex">
          <button
            onClick={() => setSelectedAd('horizontal')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedAd === 'horizontal'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Horizontal
          </button>
          <button
            onClick={() => setSelectedAd('vertical')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedAd === 'vertical'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Vertical
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Ad Preview */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {currentDesign.title}
              </h2>
              <div className="flex items-center text-gray-500 text-sm">
                <Eye size={16} className="mr-1" />
                Vista Previa
              </div>
            </div>
            
            <div className="flex justify-center">
              <AdBanner type={selectedAd} />
            </div>
            
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-500">
                Dimensiones: {currentDesign.dimensions}
              </span>
            </div>
          </div>
        </div>

        {/* Design Analysis */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Palette className="mr-2" size={20} />
              Análisis de Diseño
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Descripción</h4>
                <p className="text-gray-600 text-sm">{currentDesign.description}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Características Principales</h4>
                <ul className="space-y-1">
                  {currentDesign.features.map((feature, index) => (
                    <li key={index} className="text-gray-600 text-sm flex items-start">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Code className="mr-2" size={20} />
              Especificaciones Técnicas
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 text-sm mb-1">Esquema de Color</h4>
                <p className="text-gray-600 text-sm">{currentDesign.colorScheme}</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 text-sm mb-1">Tipografía</h4>
                <p className="text-gray-600 text-sm">{currentDesign.typography}</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 text-sm mb-1">Layout</h4>
                <p className="text-gray-600 text-sm">{currentDesign.layout}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Design Principles */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <BarChart3 className="mr-2" size={24} />
          Principios de Diseño Aplicados
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Eye size={24} className="text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Jerarquía Visual</h4>
            <p className="text-gray-600 text-sm">
              Títulos prominentes, información secundaria organizada, elementos de acción destacados
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Palette size={24} className="text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Contraste</h4>
            <p className="text-gray-600 text-sm">
              Colores complementarios, texto legible, elementos diferenciados por color y tamaño
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart3 size={24} className="text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Balance</h4>
            <p className="text-gray-600 text-sm">
              Distribución equilibrada de elementos, espaciado consistente, proporciones armoniosas
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Megaphone size={24} className="text-orange-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Call-to-Action</h4>
            <p className="text-gray-600 text-sm">
              Botones prominentes, texto persuasivo, ubicación estratégica para maximizar conversiones
            </p>
          </div>
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Guías de Uso como Plantillas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Anuncio Horizontal</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Ideal para headers y banners principales</li>
              <li>• Perfecto para contenido promocional en desktop</li>
              <li>• Funciona bien en secciones de contenido amplio</li>
              <li>• Recomendado para servicios premium</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Anuncio Vertical</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Perfecto para sidebars y feeds móviles</li>
              <li>• Ideal para promociones con descuentos</li>
              <li>• Funciona bien en espacios verticales limitados</li>
              <li>• Recomendado para ofertas especiales</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
          <h4 className="font-semibold text-gray-800 mb-2">Elementos Personalizables</h4>
          <p className="text-sm text-gray-700">
            Todos los elementos pueden adaptarse: colores de marca, tipografías corporativas, 
            imágenes específicas, textos promocionales, precios y llamadas a la acción. 
            Los gradientes y efectos hover pueden ajustarse según la identidad visual de cada cliente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdShowcase;