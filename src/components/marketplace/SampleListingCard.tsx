import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Star, ExternalLink, Award, Users } from 'lucide-react';
import { SampleListing } from '../../data/sampleListings';

interface SampleListingCardProps {
  listing: SampleListing;
  className?: string;
}

const SampleListingCard: React.FC<SampleListingCardProps> = ({ listing, className = '' }) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${className}`}>
      {/* Header Image */}
      <div className="relative h-48">
        <img 
          src={listing.images[0]} 
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex space-x-2">
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
            {listing.category}
          </span>
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
            {listing.modality}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-2 py-1 rounded-full font-medium flex items-center">
            <Award size={12} className="mr-1 text-yellow-500" />
            {listing.experienceLevel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
          {listing.title}
        </h3>

        {/* Description Preview */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {truncateText(listing.description, 150)}
        </p>

        {/* Keywords */}
        <div className="flex flex-wrap gap-1 mb-4">
          {listing.keywords.slice(0, 3).map((keyword, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              {keyword}
            </span>
          ))}
          {listing.keywords.length > 3 && (
            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
              +{listing.keywords.length - 3}
            </span>
          )}
        </div>

        {/* Price and Delivery */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-2xl font-bold text-blue-600">
              €{listing.price}
            </span>
            <span className="text-gray-500 text-sm ml-1">
              {listing.category === 'Desarrollo Web' ? '/hora' : '/proyecto'}
            </span>
          </div>
          <div className="text-right">
            <div className="flex items-center text-gray-600 text-sm">
              <Clock size={14} className="mr-1" />
              <span>{listing.deliveryTime}</span>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <MapPin size={14} className="mr-1" />
          <span>{listing.location}</span>
        </div>

        {/* Key Benefits Preview */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 text-sm mb-2">Beneficios clave:</h4>
          <ul className="space-y-1">
            {listing.keyBenefits.slice(0, 2).map((benefit, index) => (
              <li key={index} className="text-gray-600 text-xs flex items-start">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                {truncateText(benefit, 60)}
              </li>
            ))}
          </ul>
        </div>

        {/* Author Info */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={listing.author.avatar} 
                alt={listing.author.name}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <h4 className="font-medium text-gray-900 text-sm">{listing.author.name}</h4>
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    <Star size={12} className="text-yellow-400 fill-current mr-1" />
                    <span className="text-xs text-gray-600">{listing.author.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={12} className="text-gray-400 mr-1" />
                    <span className="text-xs text-gray-600">{listing.author.reviewsCount} reseñas</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
              Ver Detalles
              <ExternalLink size={14} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleListingCard;