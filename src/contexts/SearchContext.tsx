import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'listing' | 'category' | 'user';
  category?: string;
}

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  suggestions: SearchSuggestion[];
  isSearching: boolean;
  searchHistory: string[];
  addToHistory: (term: string) => void;
  clearHistory: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Generate suggestions based on search term
  useEffect(() => {
    const generateSuggestions = async () => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsSearching(true);
      try {
        // Search in listings
        const { data: listings } = await supabase
          .from('listings')
          .select('id, title, category')
          .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
          .eq('status', 'active')
          .limit(5);

        // Search in categories
        const categories = [
          'Diseño Gráfico', 'Desarrollo Web', 'Marketing Digital',
          'Redacción & Traducción', 'Video & Animación', 'Música & Audio',
          'Programación & Tecnología', 'Negocios', 'Estilo de Vida', 'Fotografía'
        ];

        const categoryMatches = categories.filter(cat =>
          cat.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const newSuggestions: SearchSuggestion[] = [
          // Listing suggestions
          ...(listings || []).map(listing => ({
            id: listing.id,
            text: listing.title,
            type: 'listing' as const,
            category: listing.category
          })),
          // Category suggestions
          ...categoryMatches.map(cat => ({
            id: cat,
            text: cat,
            type: 'category' as const
          }))
        ];

        setSuggestions(newSuggestions.slice(0, 8));
      } catch (error) {
        console.error('Error generating suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(generateSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const addToHistory = (term: string) => {
    if (!term.trim()) return;
    
    const newHistory = [term, ...searchHistory.filter(h => h !== term)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <SearchContext.Provider value={{
      searchTerm,
      setSearchTerm,
      suggestions,
      isSearching,
      searchHistory,
      addToHistory,
      clearHistory
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};