import React from 'react';
import { Monitor, MapPin, TrendingUp } from 'lucide-react';
import { getModalityStats } from '../../data/samplePublications';

interface IModalityStatsProps {
  className?: string;
  showTitle?: boolean;
}

export const ModalityStats: React.FC<IModalityStatsProps> = ({
  className = '',
  showTitle = true
}) => {
  const stats = getModalityStats();

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      {showTitle && (
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={20} className="text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Estadísticas de Modalidades</h3>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total */}
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
          <div className="text-sm text-gray-600">Total de publicaciones</div>
        </div>
        
        {/* Presencial */}
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-1">
            <MapPin size={16} className="text-green-600" />
            <div className="text-2xl font-bold text-green-800">{stats.presencial}</div>
          </div>
          <div className="text-sm text-green-600">
            Presencial ({stats.presencialPercentage}%)
          </div>
        </div>
        
        {/* Remoto */}
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Monitor size={16} className="text-blue-600" />
            <div className="text-2xl font-bold text-blue-800">{stats.remoto}</div>
          </div>
          <div className="text-sm text-blue-600">
            Remoto ({stats.remotoPercentage}%)
          </div>
        </div>
      </div>
      
      {/* Barra de progreso */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Distribución</span>
          <span>100%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${stats.presencialPercentage}%` }}
          ></div>
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300 -mt-2"
            style={{ width: `${stats.remotoPercentage}%`, marginLeft: `${stats.presencialPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Presencial</span>
          <span>Remoto</span>
        </div>
      </div>
    </div>
  );
};

export default ModalityStats; 