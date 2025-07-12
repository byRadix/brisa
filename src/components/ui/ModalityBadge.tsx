import React from 'react';
import { Monitor, MapPin } from 'lucide-react';
import { PublicationModality } from '../../data/samplePublications';

interface IModalityBadgeProps {
  modality: PublicationModality;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ModalityBadge: React.FC<IModalityBadgeProps> = ({
  modality,
  size = 'md',
  className = ''
}) => {
  const getModalityConfig = (modality: PublicationModality) => {
    switch (modality) {
      case 'remoto':
        return {
          label: 'Remoto',
          icon: Monitor,
          colors: 'bg-blue-100 text-blue-800 border-blue-200',
          iconColors: 'text-blue-600'
        };
      case 'presencial':
        return {
          label: 'Presencial',
          icon: MapPin,
          colors: 'bg-green-100 text-green-800 border-green-200',
          iconColors: 'text-green-600'
        };
      default:
        return {
          label: 'Desconocido',
          icon: MapPin,
          colors: 'bg-gray-100 text-gray-800 border-gray-200',
          iconColors: 'text-gray-600'
        };
    }
  };

  const config = getModalityConfig(modality);
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  return (
    <div className={`
      inline-flex items-center gap-1.5 rounded-full border font-medium
      ${config.colors}
      ${sizeClasses[size]}
      ${className}
    `}>
      <IconComponent size={iconSizes[size]} className={config.iconColors} />
      <span>{config.label}</span>
    </div>
  );
};

export default ModalityBadge; 