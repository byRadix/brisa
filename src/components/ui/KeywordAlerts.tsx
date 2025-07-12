import React, { useState, useEffect } from 'react';
import { Bell, Plus, X, Search, Tag } from 'lucide-react';
import { 
  getKeywordSuggestions, 
  getMostPopularKeywords 
} from '../../data/samplePublications';

interface KeywordAlert {
  id: string;
  keyword: string;
  createdAt: Date;
  isActive: boolean;
}

interface KeywordAlertsProps {
  className?: string;
  onAlertsChange?: (alerts: KeywordAlert[]) => void;
}

export const KeywordAlerts: React.FC<KeywordAlertsProps> = ({
  className = '',
  onAlertsChange
}) => {
  const [alerts, setAlerts] = useState<KeywordAlert[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [popularKeywords] = useState(() => getMostPopularKeywords(10));

  useEffect(() => {
    // Cargar alertas guardadas del localStorage
    const savedAlerts = localStorage.getItem('keywordAlerts');
    if (savedAlerts) {
      try {
        const parsedAlerts = JSON.parse(savedAlerts).map((alert: { id: string; keyword: string; createdAt: string; isActive: boolean }) => ({
          ...alert,
          createdAt: new Date(alert.createdAt)
        }));
        setAlerts(parsedAlerts);
      } catch (error) {
        console.error('Error loading keyword alerts:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Guardar alertas en localStorage
    localStorage.setItem('keywordAlerts', JSON.stringify(alerts));
    onAlertsChange?.(alerts);
  }, [alerts, onAlertsChange]);

  const addAlert = (keyword: string) => {
    if (!keyword.trim()) return;
    
    const normalizedKeyword = keyword.trim().toLowerCase();
    
    // Verificar si ya existe
    if (alerts.some(alert => alert.keyword.toLowerCase() === normalizedKeyword)) {
      return;
    }

    const newAlert: KeywordAlert = {
      id: Date.now().toString(),
      keyword: normalizedKeyword,
      createdAt: new Date(),
      isActive: true
    };

    setAlerts(prev => [...prev, newAlert]);
    setNewKeyword('');
    setShowSuggestions(false);
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const toggleAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const handleKeywordChange = (value: string) => {
    setNewKeyword(value);
    
    if (value.trim().length > 1) {
      const suggestions = getKeywordSuggestions(value, 8);
      setSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    addAlert(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAlert(newKeyword);
  };

  const activeAlerts = alerts.filter(alert => alert.isActive);

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <div className="flex items-center mb-4">
        <Bell size={20} className="text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Alertas de Palabras Clave</h2>
      </div>

      <p className="text-gray-600 text-sm mb-6">
        Recibe notificaciones cuando se publiquen anuncios que coincidan con tus palabras clave de interés.
      </p>

      {/* Formulario para agregar nueva alerta */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <div className="flex">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={newKeyword}
                onChange={(e) => handleKeywordChange(e.target.value)}
                placeholder="Ej: fontanero, diseño web, mudanza..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Sugerencias */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center"
                >
                  <Tag size={14} className="text-gray-400 mr-2" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </form>

      {/* Palabras clave populares */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Palabras clave populares</h3>
        <div className="flex flex-wrap gap-2">
          {popularKeywords.map(({ keyword, count }) => (
            <button
              key={keyword}
              onClick={() => addAlert(keyword)}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              title={`${count} publicaciones`}
            >
              {keyword} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Lista de alertas activas */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Tus alertas ({activeAlerts.length})
        </h3>
        
        {alerts.length === 0 ? (
          <p className="text-gray-500 text-sm">No tienes alertas configuradas. Agrega palabras clave para recibir notificaciones.</p>
        ) : (
          <div className="space-y-2">
            {alerts.map(alert => (
              <div
                key={alert.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  alert.isActive 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <button
                    onClick={() => toggleAlert(alert.id)}
                    className={`w-4 h-4 rounded mr-3 ${
                      alert.isActive 
                        ? 'bg-blue-600 border-blue-600' 
                        : 'bg-gray-300 border-gray-300'
                    } border-2 transition-colors`}
                  >
                    {alert.isActive && (
                      <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <div>
                    <span className={`font-medium ${alert.isActive ? 'text-blue-800' : 'text-gray-500'}`}>
                      {alert.keyword}
                    </span>
                    <p className="text-xs text-gray-500">
                      Creada el {alert.createdAt.toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => removeAlert(alert.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Estadísticas */}
      {activeAlerts.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Alertas activas: {activeAlerts.length}</span>
            <span>Total de alertas: {alerts.length}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeywordAlerts; 