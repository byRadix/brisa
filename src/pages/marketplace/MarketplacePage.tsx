import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, ChevronDown, PlusCircle } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import Button from '../../components/ui/Button';
import ListingCard from '../../components/marketplace/ListingCard';
import CreateListingModal from '../../components/marketplace/CreateListingModal';
import MarketplaceAd from '../../components/ads/MarketplaceAd';
import { useAuth } from '../../contexts/AuthContext';

interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  price_type: string;
  image_url: string | null;
  created_at: string;
  author_id: string;
  author: {
    full_name: string;
    username: string;
    avatar_url: string;
  } | null;
}

const MarketplacePage: React.FC = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Categories
  const categories = [
    'Todas',
    'Diseño Gráfico',
    'Desarrollo Web',
    'Marketing Digital',
    'Redacción & Traducción',
    'Video & Animación',
    'Música & Audio',
    'Programación & Tecnología',
    'Negocios',
    'Estilo de Vida'
  ];
  
  // Sorting options
  const sortOptions = [
    { label: 'Más recientes', value: 'recent' },
    { label: 'Menor precio', value: 'price_asc' },
    { label: 'Mayor precio', value: 'price_desc' },
  ];
  
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);

  useEffect(() => {
    fetchListings();
  }, [searchParams]);

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      // First, fetch the listings
      let query = supabase
        .from('listings')
        .select('*')
        .eq('status', 'active');
      
      // Apply filters from URL parameters
      const category = searchParams.get('category');
      if (category && category !== 'Todas') {
        query = query.eq('category', category);
      }
      
      const search = searchParams.get('q');
      if (search) {
        query = query.ilike('title', `%${search}%`);
      }
      
      const minPrice = searchParams.get('min_price');
      if (minPrice) {
        query = query.gte('price', minPrice);
      }
      
      const maxPrice = searchParams.get('max_price');
      if (maxPrice) {
        query = query.lte('price', maxPrice);
      }
      
      // Apply sorting
      const sort = searchParams.get('sort') || 'recent';
      if (sort === 'recent') {
        query = query.order('created_at', { ascending: false });
      } else if (sort === 'price_asc') {
        query = query.order('price', { ascending: true });
      } else if (sort === 'price_desc') {
        query = query.order('price', { ascending: false });
      }
      
      const { data: listingsData, error: listingsError } = await query;
      
      if (listingsError) throw listingsError;

      // Then fetch all unique authors' profiles
      if (listingsData && listingsData.length > 0) {
        const authorIds = [...new Set(listingsData.map(listing => listing.author_id))];
        const { data: authorsData, error: authorsError } = await supabase
          .from('profiles')
          .select('id, full_name, username, avatar_url')
          .in('id', authorIds);

        if (authorsError) throw authorsError;

        // Map authors to their listings
        const enrichedListings = listingsData.map(listing => ({
          ...listing,
          author: authorsData?.find(author => author.id === listing.author_id) || null
        }));

        setListings(enrichedListings as Listing[]);
      } else {
        setListings([]);
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    
    if (searchTerm) {
      params.set('q', searchTerm);
    } else {
      params.delete('q');
    }
    
    setSearchParams(params);
  };
  
  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (category && category !== 'Todas') {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    
    setSelectedCategory(category);
    setSearchParams(params);
  };
  
  const handlePriceFilter = () => {
    const params = new URLSearchParams(searchParams);
    
    if (priceRange.min) {
      params.set('min_price', priceRange.min);
    } else {
      params.delete('min_price');
    }
    
    if (priceRange.max) {
      params.set('max_price', priceRange.max);
    } else {
      params.delete('max_price');
    }
    
    setSearchParams(params);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    const params = new URLSearchParams(searchParams);
    
    if (sort !== 'recent') {
      params.set('sort', sort);
    } else {
      params.delete('sort');
    }
    
    setSelectedSort(sort);
    setSearchParams(params);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Marketplace</h1>
          <p className="text-gray-600">
            Explora servicios profesionales en diversas categorías
          </p>
        </div>
        
        {user && (
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            leftIcon={<PlusCircle size={20} />}
          >
            Crear Anuncio
          </Button>
        )}
      </div>

      {/* Anuncio Destacado */}
      <div className="mb-8">
        <MarketplaceAd type="featured" />
      </div>
      
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Buscar servicios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </div>
          </div>
          
          <Button type="submit">
            Buscar
          </Button>
          
          <Button 
            type="button" 
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            rightIcon={<ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />}
          >
            <Filter size={16} className="mr-2" />
            Filtros
          </Button>
        </form>
        
        {/* Expanded filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                >
                  <option value="">Todas las categorías</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rango de Precio
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ordenar por
                </label>
                <select
                  value={selectedSort}
                  onChange={handleSortChange}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearFilters}
              >
                Limpiar Filtros
              </Button>
              <Button 
                size="sm"
                onClick={handlePriceFilter}
              >
                Aplicar Filtros
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Results count and sorting */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          {isLoading 
            ? 'Cargando resultados...' 
            : `Mostrando ${listings.length} resultados`}
        </p>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 hidden md:inline">Ordenar por:</span>
          <select
            value={selectedSort}
            onChange={handleSortChange}
            className="rounded-lg border border-gray-300 bg-white py-1.5 px-3 text-sm text-gray-700 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Listings Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {listings.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium text-gray-800 mb-2">No se encontraron resultados</h3>
                  <p className="text-gray-600 mb-6">Intenta con diferentes términos de búsqueda o filtros</p>
                  <Button 
                    variant="outline"
                    onClick={clearFilters}
                  >
                    Limpiar filtros
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {listings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar con anuncio */}
        <div className="lg:w-80">
          <div className="sticky top-24">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Servicio Destacado</h3>
              <MarketplaceAd type="sidebar" />
            </div>
            
            {/* Información adicional */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">¿Necesitas ayuda?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Nuestro equipo está aquí para ayudarte a encontrar el freelancer perfecto para tu proyecto.
              </p>
              <Button variant="outline" fullWidth>
                Contactar Soporte
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Listing Modal */}
      <CreateListingModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchListings}
      />
    </div>
  );
};

export default MarketplacePage;