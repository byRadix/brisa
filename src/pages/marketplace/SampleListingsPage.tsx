import React, { useState } from 'react';
import { Search, Filter, Eye } from 'lucide-react';
import { sampleListings, SampleListing } from '../../data/sampleListings';
import SampleListingCard from '../../components/marketplace/SampleListingCard';
import SampleListingDetail from '../../components/marketplace/SampleListingDetail';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const SampleListingsPage: React.FC = () => {
  const [selectedListing, setSelectedListing] = useState<SampleListing | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['Todas', 'Desarrollo Web', 'Marketing Digital'];

  const filteredListings = sampleListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Todas' || listing.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (selectedListing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <button
              onClick={() => setSelectedListing(null)}
              className="text-blue-600 hover:text-blue-700 inline-flex items-center"
            >
              ← Volver a Ejemplos de Publicaciones
            </button>
          </div>
        </div>
        <SampleListingDetail listing={selectedListing} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ejemplos de Publicaciones Profesionales
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre publicaciones detalladas que muestran la calidad y profesionalismo 
            que esperamos en nuestra plataforma. Estos ejemplos sirven como referencia 
            para crear anuncios efectivos y atractivos.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar en ejemplos..."
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
              Publicaciones de Ejemplo ({filteredListings.length})
            </h2>
            <div className="flex items-center text-gray-600">
              <Eye size={16} className="mr-2" />
              <span className="text-sm">Haz clic en cualquier tarjeta para ver los detalles completos</span>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {filteredListings.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-800 mb-2">No se encontraron ejemplos</h3>
            <p className="text-gray-600 mb-6">Intenta con diferentes términos de búsqueda</p>
            <Button onClick={() => { setSearchTerm(''); setSelectedCategory(''); }}>
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredListings.map((listing) => (
              <div key={listing.id} onClick={() => setSelectedListing(listing)} className="cursor-pointer">
                <SampleListingCard listing={listing} />
              </div>
            ))}
          </div>
        )}

        {/* Information Section */}
        <div className="mt-16 bg-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Por qué estos ejemplos son efectivos?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Elementos Clave Incluidos</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Títulos descriptivos y llamativos
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Descripciones detalladas (+100 palabras)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Beneficios claros para el cliente
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Información de contacto completa
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Palabras clave relevantes
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Mejores Prácticas</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Precios transparentes y competitivos
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Tiempos de entrega realistas
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Modalidades de trabajo claras
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Experiencia y credenciales visibles
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Imágenes profesionales y relevantes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleListingsPage;