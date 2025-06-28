import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Clock, Trending, Hash, FileText, User } from 'lucide-react';
import { useSearch } from '../../contexts/SearchContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { 
    searchTerm, 
    setSearchTerm, 
    suggestions, 
    isSearching, 
    searchHistory, 
    addToHistory, 
    clearHistory 
  } = useSearch();
  
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSearchTerm(localSearchTerm);
  }, [localSearchTerm, setSearchTerm]);

  const handleSearch = (term: string) => {
    if (!term.trim()) return;
    
    addToHistory(term);
    navigate(`/marketplace?q=${encodeURIComponent(term)}`);
    onClose();
    setLocalSearchTerm('');
  };

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === 'listing') {
      navigate(`/marketplace/${suggestion.id}`);
    } else if (suggestion.type === 'category') {
      navigate(`/marketplace?category=${encodeURIComponent(suggestion.text)}`);
    }
    addToHistory(suggestion.text);
    onClose();
    setLocalSearchTerm('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(localSearchTerm);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'listing':
        return <FileText size={16} className="text-blue-500" />;
      case 'category':
        return <Hash size={16} className="text-green-500" />;
      case 'user':
        return <User size={16} className="text-purple-500" />;
      default:
        return <Search size={16} className="text-gray-400" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-start justify-center p-4 pt-16">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-100">
          {/* Search Input */}
          <div className="flex items-center p-4 border-b border-gray-100">
            <Search size={20} className="text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar servicios, categorías, freelancers..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 text-lg placeholder-gray-400 border-none outline-none"
            />
            {localSearchTerm && (
              <button
                onClick={() => setLocalSearchTerm('')}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            )}
            <button
              onClick={onClose}
              className="ml-2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-96 overflow-y-auto">
            {localSearchTerm.length === 0 ? (
              /* Search History */
              <div className="p-4">
                {searchHistory.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-700 flex items-center">
                        <Clock size={16} className="mr-2" />
                        Búsquedas recientes
                      </h3>
                      <button
                        onClick={clearHistory}
                        className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Limpiar
                      </button>
                    </div>
                    <div className="space-y-1">
                      {searchHistory.map((term, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(term)}
                          className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center"
                        >
                          <Clock size={14} className="mr-3 text-gray-400" />
                          {term}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Search size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      Busca en Briisa.app
                    </h3>
                    <p className="text-gray-500">
                      Encuentra servicios, categorías y freelancers
                    </p>
                  </div>
                )}

                {/* Popular searches */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <Trending size={16} className="mr-2" />
                    Búsquedas populares
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Diseño web', 'Logo', 'Marketing', 'Desarrollo app', 'SEO'].map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSearch(term)}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Search Suggestions */
              <div className="p-2">
                {isSearching ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                    <span className="ml-2 text-gray-500">Buscando...</span>
                  </div>
                ) : suggestions.length > 0 ? (
                  <div className="space-y-1">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center"
                      >
                        <div className="mr-3">
                          {getIconForType(suggestion.type)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            {suggestion.text}
                          </div>
                          {suggestion.category && (
                            <div className="text-sm text-gray-500">
                              en {suggestion.category}
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 capitalize">
                          {suggestion.type === 'listing' ? 'Servicio' : 
                           suggestion.type === 'category' ? 'Categoría' : 'Usuario'}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Search size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      No se encontraron resultados
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Intenta con otros términos de búsqueda
                    </p>
                    <button
                      onClick={() => handleSearch(localSearchTerm)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Buscar "{localSearchTerm}"
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;