import React from 'react';
import { Monitor, Globe, Clock } from 'lucide-react';

interface IRemoteWorkInfoProps {
  className?: string;
  variant?: 'compact' | 'detailed';
}

export const RemoteWorkInfo: React.FC<IRemoteWorkInfoProps> = ({
  className = '',
  variant = 'compact'
}) => {
  if (variant === 'compact') {
    return (
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-3 ${className}`}>
        <div className="flex items-center gap-2">
          <Monitor size={14} className="text-blue-600" />
          <span className="text-xs text-blue-700 font-medium">Trabajo Remoto</span>
        </div>
        <p className="text-xs text-blue-600 mt-1">
          Se puede realizar desde cualquier ubicación
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Monitor size={20} className="text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-blue-800 mb-1">Trabajo Remoto Disponible</h3>
          <p className="text-sm text-blue-700 mb-3">
            Este trabajo se puede realizar desde cualquier ubicación. No es necesario desplazarse físicamente.
          </p>
          <div className="flex items-center gap-4 text-xs text-blue-600">
            <div className="flex items-center gap-1">
              <Globe size={12} />
              <span>Ubicación flexible</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>Horarios flexibles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoteWorkInfo; 