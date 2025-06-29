import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Eye, 
  Star, 
  Tag, 
  User, 
  Phone, 
  Mail, 
  Globe,
  Clock,
  DollarSign
} from 'lucide-react';
import { ExternalAd } from '../../types/externalAds';

interface ExternalAdCardProps {
  ad: ExternalAd;
  onClick?: () => void;
}

const ExternalAdCard: React.FC<ExternalAdCardProps> = ({ ad, onClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'pending': return 'Pendiente';
      case 'expired': return 'Expirado';
      default: return status;
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Header with Featured Badge */}
      {ad.featured && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-2">
          <div className="flex items-center justify-center">
            <Star size={16} className="mr-2 fill-current" />
            <span className="text-sm font-medium">Anuncio Destacado</span>
          </div>
        </div>
      )}

      {/* Main Image */}
      {ad.images.length > 0 && (
        <div className="relative h-48">
          <img 
            src={ad.images[0]} 
            alt={ad.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex space-x-2">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              {ad.category}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(ad.status)}`}>
              {getStatusLabel(ad.status)}
            </span>
          </div>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
            <div className="flex items-center text-gray-700 text-xs">
              <Eye size={12} className="mr-1" />
              <span>{ad.views.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">
          {ad.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {ad.description}
        </p>

        {/* Price */}
        {ad.price && (
          <div className="flex items-center mb-4">
            <DollarSign size={16} className="text-green-600 mr-2" />
            <span className="text-xl font-bold text-green-600">
              {ad.price.amount.toLocaleString()} {ad.price.currency}
            </span>
            <span className="text-gray-500 text-sm ml-2">
              {ad.price.type === 'hourly' ? '/hora' : 
               ad.price.type === 'fixed' ? '/proyecto' : 'negociable'}
            </span>
          </div>
        )}

        {/* User Info */}
        <div className="flex items-center mb-4">
          <img 
            src={ad.user.avatar || 'https://via.placeholder.com/40'} 
            alt={ad.user.name}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <h4 className="font-medium text-gray-900 text-sm">{ad.user.name}</h4>
            <div className="flex items-center text-gray-500 text-xs">
              <MapPin size={12} className="mr-1" />
              <span>{ad.user.location}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {ad.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
          {ad.tags.length > 3 && (
            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
              +{ad.tags.length - 3}
            </span>
          )}
        </div>

        {/* Post Date and Contact Info */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <Calendar size={12} className="mr-1" />
              <span>{formatDate(ad.postDate)}</span>
            </div>
            <div className="flex items-center space-x-2">
              {ad.contactInfo?.phone && (
                <Phone size={12} className="text-gray-400" />
              )}
              {ad.contactInfo?.email && (
                <Mail size={12} className="text-gray-400" />
              )}
              {ad.contactInfo?.website && (
                <Globe size={12} className="text-gray-400" />
              )}
            </div>
          </div>
        </div>

        {/* Expiry Date */}
        {ad.expiryDate && (
          <div className="mt-2 flex items-center text-xs text-orange-600">
            <Clock size={12} className="mr-1" />
            <span>Expira: {formatDate(ad.expiryDate)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExternalAdCard;