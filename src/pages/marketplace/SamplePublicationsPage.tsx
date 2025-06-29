import React, { useState } from 'react';
import { Search, Filter, Eye, ShoppingBag } from 'lucide-react';
import { samplePublications } from '../../data/samplePublications';
import SamplePublicationCard from '../../components/marketplace/SamplePublicationCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const SamplePublicationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['Todas', 'Electrónicos', 'Deportes', 'Hogar', 'Moda', 'Vehículos'];

  const filteredPublications = samplePublications.filter(publication => {
    const matchesSearch = publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         publication.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Todas' || publication.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Publicaciones de Ejemplo del Marketplace
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estas son publicaciones de muestra que demuestran cómo se verían los anuncios reales 
            en nuestro marketplace. Los datos son ficticios y sirven únicamente para propósitos de demostración.
          </p>
        </div>

        {/* Example Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
              <Eye size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-blue-800">Publicaciones de Demostración</h2>
              <p className="text-blue-700">
                Estas publicaciones utilizan datos hardcodeados según la estructura JSON proporcionada
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 mt-4">
            <h3 className="font-semibold text-gray-800 mb-2">Estructura de datos utilizada:</h3>
            <pre className="text-xs text-gray-600 overflow-x-auto">
{`{
  "id": "pub001",
  "title": "iPhone 13 Pro Max - 256GB",
  "description": "Smartphone Apple en excelente estado...",
  "price": 899.99,
  "category": "Electrónicos",
  "condition": "Usado - Como nuevo",
  "location": "Ciudad de México",
  "images": ["url_imagen1.jpg", "url_imagen2.jpg"],
  "seller": {
    "id": "user123",
    "name": "Carlos Méndez",
    "rating": 4.8
  },
  "datePosted": "2024-01-15"
}`}
            </pre>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar en publicaciones de ejemplo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search size={18} />}
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            >
              {categories.map((category) => (
                <option key={category} value={category === 'Todas' ? '' : category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Publicaciones de Ejemplo ({filteredPublications.length})
            </h2>
            <div className="flex items-center text-gray-600">
              <ShoppingBag size={16} className="mr-2" />
              <span className="text-sm">Datos hardcodeados para demostración</span>
            </div>
          </div>
        </div>

        {/* Publications Grid */}
        {filteredPublications.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-800 mb-2">No se encontraron publicaciones</h3>
            <p className="text-gray-600 mb-6">Intenta con diferentes términos de búsqueda</p>
            <Button onClick={() => { setSearchTerm(''); setSelectedCategory(''); }}>
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPublications.map((publication) => (
              <SamplePublicationCard key={publication.id} publication={publication} />
            ))}
          </div>
        )}

        {/* Information Section */}
        <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Información sobre las Publicaciones de Ejemplo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Datos Incluidos</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Título descriptivo del producto
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Descripción detallada con características
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Precio en formato numérico
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Categoría y condición del producto
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Ubicación geográfica
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Múltiples imágenes del producto
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Información completa del vendedor
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Características del Diseño</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Layout responsivo de dos columnas
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Galería de imágenes interactiva
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Información del vendedor destacada
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Sistema de valoraciones y reseñas
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Botones de acción prominentes
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Badges de estado y categoría
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Diseño profesional y moderno
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Nota Importante</h4>
            <p className="text-gray-700 text-sm">
              Estas publicaciones utilizan la estructura de datos exacta proporcionada en el JSON hardcodeado. 
              En una implementación real, estos datos vendrían de una base de datos y incluirían funcionalidades 
              adicionales como mensajería, sistema de pagos, y gestión de inventario.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SamplePublicationsPage;