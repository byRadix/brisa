import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';

interface Author {
  full_name: string;
  username: string;
  avatar_url: string;
}

interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  price_type: string;
  image_url?: string | null;
  image_urls?: string[] | null;
  created_at: string;
  author: Author | null;
  location?: string | null;
}

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Example images for demonstration
  const defaultImages = [
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  ];

  // Get the first image from image_urls array, or fallback to image_url, or use default
  const getImageUrl = () => {
    if (listing.image_urls && listing.image_urls.length > 0) {
      return listing.image_urls[0];
    }
    if (listing.image_url) {
      return listing.image_url;
    }
    return defaultImages[Math.floor(Math.random() * defaultImages.length)];
  };

  return (
    <Link 
      to={`/marketplace/${listing.id}`}
      className="block w-80 bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md transform hover:-translate-y-1"
      style={{ height: '400px' }}
    >
      <div className="relative h-52">
        <img 
          src={getImageUrl()} 
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {listing.category}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col h-[248px]">
        <div className="flex-grow">
          <h3 className="font-semibold text-gray-900 mb-2">
            {truncateText(listing.title, 60)}
          </h3>

          <div className="flex items-center justify-between mb-4">
            <span className="text-blue-600 font-bold text-lg">
              ${listing.price.toLocaleString()}
              <span className="text-gray-500 font-normal text-sm">/{listing.price_type}</span>
            </span>
          </div>

          {listing.location && (
            <div className="flex items-center text-gray-600 text-sm mb-4">
              <MapPin size={14} className="mr-1" />
              <span>{listing.location}</span>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                {listing.author?.avatar_url ? (
                  <img 
                    src={listing.author.avatar_url} 
                    alt={listing.author.full_name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-semibold">
                    {listing.author?.full_name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {listing.author?.full_name || 'Usuario'}
                </p>
                <div className="flex items-center text-gray-500 text-xs">
                  <Clock size={12} className="mr-1" />
                  <span>{formatDate(listing.created_at)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;