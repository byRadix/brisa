import React from 'react';
import { Monitor, MapPin, Filter } from 'lucide-react';
import { PublicationModality } from '../../data/samplePublications';

interface IModalityFilterProps {
  selectedModality: PublicationModality | 'all';
  onModalityChange: (modality: PublicationModality | 'all') => void;
  className?: string;
  showLabel?: boolean;
}

export const ModalityFilter: React.FC<IModalityFilterProps> = ({
  selectedModality,
  onModalityChange,
  className = '',
  showLabel = true
}) => {
  const options = [
    { value: 'all', label: 'Todas', icon: Filter, colors: 'bg-gray-100 text-gray-800 border-gray-200' },
    { value: 'presencial', label: 'Presencial', icon: MapPin, colors: 'bg-green-100 text-green-800 border-green-200' },
    { value: 'remoto', label: 'Remoto', icon: Monitor, colors: 'bg-blue-100 text-blue-800 border-blue-200' }
  ] as const;

  return (
    <div className={`space-y-2 ${className}`}>
      {showLabel && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Modalidad de trabajo
        </label>
      )}
      
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const IconComponent = option.icon;
          const isSelected = selectedModality === option.value;
          
          return (
            <button
              key={option.value}
              onClick={() => onModalityChange(option.value)}
              className={`
                inline-flex items-center gap-2 px-3 py-2 rounded-lg border font-medium text-sm
                transition-all duration-200 hover:scale-105
                ${isSelected 
                  ? 'ring-2 ring-blue-500 ring-offset-2 shadow-md' 
                  : 'hover:shadow-sm'
                }
                ${option.colors}
                ${isSelected ? 'bg-opacity-90' : 'bg-opacity-70 hover:bg-opacity-90'}
              `}
            >
              <IconComponent size={16} />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ModalityFilter; 