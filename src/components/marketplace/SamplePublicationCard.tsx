import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Calendar } from 'lucide-react';
import { SamplePublication } from '../../data/samplePublications';
import PublicationMapThumbnail from '../ui/PublicationMapThumbnail';

interface SamplePublicationCardProps {
  publication: SamplePublication;
  className?: string;
}

const SamplePublicationCard: React.FC<SamplePublicationCardProps> = ({ 
  publication, 
  className = '' 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getConditionColor = (condition: string) => {
    if (condition.includes('Como nuevo')) return 'bg-green-100 text-green-800';
    if (condition.includes('Buen estado')) return 'bg-blue-100 text-blue-800';
    if (condition.includes('Regular')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Link 
      to={`/marketplace/sample/${publication.id}`}
      className={`block bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${className}`}
    >
      {/* Image */}
      <div className="relative h-48">
        <img 
          src={publication.images[0]} 
          alt={publication.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex space-x-2">
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
            {publication.category}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getConditionColor(publication.condition)}`}>
            {publication.condition}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
          <span className="text-xs font-medium text-gray-800">EJEMPLO</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Price */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2 flex-1 mr-3">
            {publication.title}
          </h3>
          <div className="text-right">
            <div className="text-xl font-bold text-green-600">
              ${publication.price.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {publication.description}
        </p>

        {/* Location and Date */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <MapPin size={14} className="mr-1" />
            <span>{publication.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(publication.datePosted)}</span>
          </div>
        </div>

        {/* Map Thumbnail */}
        <div className="mb-4">
          <PublicationMapThumbnail
            coordinates={publication.coordinates}
            height="100px"
            className="w-full"
          />
        </div>

        {/* Seller Info */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold mr-3">
                {publication.seller.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">{publication.seller.name}</h4>
                <div className="flex items-center">
                  <Star size={12} className="text-yellow-400 fill-current mr-1" />
                  <span className="text-xs text-gray-600">{publication.seller.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="text-xs text-blue-600 font-medium">
              Ver detalles →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SamplePublicationCard;