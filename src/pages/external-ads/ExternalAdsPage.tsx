import React, { useState, useEffect } from 'react';
import { Search, Filter, Database, AlertCircle, RefreshCw, Calendar, TrendingDown } from 'lucide-react';
import { ExternalAd } from '../../types/externalAds';
import { externalAdsService } from '../../services/externalAdsService';
import ExternalAdCard from '../../components/external-ads/ExternalAdCard';
import ExternalAdDetail from '../../components/external-ads/ExternalAdDetail';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ExternalAdsPage: React.FC = () => {
  const [ads, setAds] = useState<ExternalAd[]>([]);
  const [selectedAd, setSelectedAd] = useState<ExternalAd | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAds, setTotalAds] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const categories = [
    'Todas las categorías',
    'Desarrollo Móvil',
    'Consultoría Empresarial',
    'Diseño Gráfico',
    'Marketing Digital',
    'Desarrollo Web'
  ];

  const fetchAds = async (page: number = 1, search?: string, category?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      let response;
      
      if (search || category) {
        response = await externalAdsService.searchAds(
          search || '', 
          category && category !== 'Todas las categorías' ? category : undefined
        );
      } else {
        response = await externalAdsService.fetchAds(page, 10);
      }

      if (response.success) {
        setAds(response.data);
        setTotalAds(response.total);
        setLastUpdated(new Date());
      } else {
        setError(response.error || 'Error al cargar los anuncios');
        setAds([]);
      }
    } catch (err) {
      setError('Error de conexión con la base de datos externa');
      setAds([]);
      console.error('Error fetching external ads:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAds(currentPage);
  }, [currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchAds(1, searchTerm, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    fetchAds(1, searchTerm, category);
  };

  const handleRefresh = () => {
    fetchAds(currentPage, searchTerm, selectedCategory);
  };

  const formatLastUpdated = () => {
    return lastUpdated.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Database size={32} className="mr-3 text-blue-600" />
                Anuncios de Base de Datos Externa
              </h1>
              <p className="text-gray-600 mt-2">
                Visualización de anuncios publicados por usuarios desde nuestra base de datos externa
              </p>
            </div>
            <Button
              onClick={handleRefresh}
              variant="outline"
              leftIcon={<RefreshCw size={16} />}
              disabled={isLoading}
            >
              Actualizar
            </Button>
          </div>

          {/* Last Updated Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar size={16} className="text-blue-600 mr-2" />
                <span className="text-blue-800 text-sm">
                  Última actualización: {formatLastUpdated()}
                </span>
              </div>
              <div className="flex items-center text-blue-700 text-sm">
                <TrendingDown size={16} className="mr-1" />
                <span>Ordenado por fecha (más recientes primero)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar anuncios por título, descripción o etiquetas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search size={18} />}
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            
            <Button type="submit" disabled={isLoading}>
              <Search size={16} className="mr-2" />
              Buscar
            </Button>
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <AlertCircle size={24} className="text-red-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-red-800">Error de Conexión</h3>
                <p className="text-red-700">{error}</p>
                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  size="sm"
                  className="mt-3 border-red-300 text-red-700 hover:bg-red-50"
                >
                  Reintentar Conexión
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Conectando con la base de datos externa...</p>
            </div>
          </div>
        )}

        {/* Results */}
        {!isLoading && !error && (
          <>
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {ads.length === 0 ? 'No se encontraron anuncios' : `${totalAds} anuncios encontrados`}
              </h2>
              {ads.length > 0 && (
                <div className="text-sm text-gray-600">
                  Página {currentPage} • Mostrando {ads.length} de {totalAds} resultados
                </div>
              )}
            </div>

            {/* Ads Grid */}
            {ads.length === 0 ? (
              <div className="text-center py-16">
                <Database size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  No hay anuncios disponibles
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || selectedCategory !== 'Todas las categorías' 
                    ? 'Intenta con diferentes términos de búsqueda o filtros'
                    : 'La base de datos externa no contiene anuncios en este momento'
                  }
                </p>
                {(searchTerm || selectedCategory !== 'Todas las categorías') && (
                  <Button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('Todas las categorías');
                      fetchAds(1);
                    }}
                    variant="outline"
                  >
                    Limpiar filtros
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ads.map((ad) => (
                  <ExternalAdCard
                    key={ad.id}
                    ad={ad}
                    onClick={() => setSelectedAd(ad)}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalAds > 10 && (
              <div className="flex justify-center mt-12">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </Button>
                  
                  <span className="flex items-center px-4 py-2 text-gray-700">
                    Página {currentPage} de {Math.ceil(totalAds / 10)}
                  </span>
                  
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage >= Math.ceil(totalAds / 10)}
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Database Info */}
        <div className="mt-16 bg-gray-100 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Información de la Base de Datos Externa
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Datos Mostrados</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Título y descripción completa del anuncio
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Fecha y hora exacta de publicación
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Información completa del usuario
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Precios, categorías y estado del anuncio
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Imágenes y archivos multimedia
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Datos completos en formato JSON
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Características</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Ordenación cronológica (más recientes primero)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Búsqueda en tiempo real por texto
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Filtrado por categorías
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Manejo de errores de conexión
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Vista detallada con datos completos
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Paginación para grandes volúmenes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedAd && (
        <ExternalAdDetail
          ad={selectedAd}
          onClose={() => setSelectedAd(null)}
        />
      )}
    </div>
  );
};

export default ExternalAdsPage;