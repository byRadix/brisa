import React from 'react';
import { MapPin, Users } from 'lucide-react';

interface IPresentialWorkInfoProps {
  location: string;
  className?: string;
  variant?: 'compact' | 'detailed';
}

export const PresentialWorkInfo: React.FC<IPresentialWorkInfoProps> = ({
  location,
  className = '',
  variant = 'compact'
}) => {
  if (variant === 'compact') {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-3 ${className}`}>
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-green-600" />
          <span className="text-xs text-green-700 font-medium">Ubicación Requerida</span>
        </div>
        <p className="text-xs text-green-600 mt-1">
          {location}
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
          <MapPin size={20} className="text-green-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-green-800 mb-1">Trabajo Presencial</h3>
          <p className="text-sm text-green-700 mb-3">
            Este trabajo requiere presencia física en la ubicación especificada.
          </p>
          <div className="flex items-center gap-4 text-xs text-green-600">
            <div className="flex items-center gap-1">
              <MapPin size={12} />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={12} />
              <span>Presencia requerida</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentialWorkInfo; 