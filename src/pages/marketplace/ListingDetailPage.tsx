import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Calendar, User, MessageSquare, Share2, Flag, Star, Tag } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';

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
  updated_at: string;
  author_id: string;
  status: string;
  location: string | null;
  contact_info: string | null;
  tags: string[] | null;
}

interface Profile {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  hourly_rate: number | null;
  category: string | null;
  availability: string | null;
  created_at: string;
}

interface Rating {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  client: {
    full_name: string | null;
    username: string | null;
    avatar_url: string | null;
  } | null;
}

const ListingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [listing, setListing] = useState<Listing | null>(null);
  const [author, setAuthor] = useState<Profile | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Default image if none provided
  const defaultImage = 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
  
  useEffect(() => {
    const fetchListingData = async () => {
      setIsLoading(true);
      try {
        if (!id) return;
        
        // Fetch listing
        const { data: listingData, error: listingError } = await supabase
          .from('listings')
          .select('*')
          .eq('id', id)
          .single();
          
        if (listingError) throw listingError;
        setListing(listingData);
        
        // Fetch author profile
        if (listingData.author_id) {
          const { data: authorData, error: authorError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', listingData.author_id)
            .single();
            
          if (authorError) throw authorError;
          setAuthor(authorData);
          
          // Fetch ratings for the author
          const { data: ratingsData, error: ratingsError } = await supabase
            .from('ratings')
            .select(`
              *,
              client:profiles(full_name, username, avatar_url)
            `)
            .eq('freelancer_id', listingData.author_id)
            .order('created_at', { ascending: false })
            .limit(5);
            
          if (ratingsError) throw ratingsError;
          setRatings(ratingsData);
          
          // Calculate average rating
          if (ratingsData.length > 0) {
            const sum = ratingsData.reduce((acc, curr) => acc + curr.rating, 0);
            setAverageRating(sum / ratingsData.length);
          }
        }
      } catch (error) {
        console.error('Error fetching listing data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchListingData();
  }, [id]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getImages = () => {
    if (listing?.image_urls && listing.image_urls.length > 0) {
      return listing.image_urls;
    }
    if (listing?.image_url) {
      return [listing.image_url];
    }
    return [defaultImage];
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
  
  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Anuncio no encontrado</h1>
          <p className="text-gray-600 mb-6">Lo sentimos, el anuncio que buscas no existe o ha sido eliminado.</p>
          <Link to="/marketplace">
            <Button>Volver al Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = getImages();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/marketplace" className="text-blue-600 hover:text-blue-700 inline-flex items-center">
          ← Volver al Marketplace
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Image Gallery */}
            <div className="relative">
              <div className="h-72 md:h-96 w-full">
                <img 
                  src={images[selectedImageIndex]} 
                  alt={listing.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {listing.category}
                  </span>
                </div>
              </div>
              
              {/* Image thumbnails */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                          selectedImageIndex === index ? 'border-white' : 'border-transparent'
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`${listing.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Listing Details */}
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">{listing.title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>Publicado el {formatDate(listing.created_at)}</span>
                </div>
                
                {listing.location && (
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    <span>{listing.location}</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>Actualizado el {formatDate(listing.updated_at)}</span>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Descripción</h2>
                <div className="prose text-gray-700 max-w-none">
                  {listing.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
              
              {/* Price Information */}
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-800">Precio</h3>
                  <div>
                    <span className="text-2xl font-bold text-blue-600">${listing.price}</span>
                    <span className="text-gray-600 text-sm"> /{listing.price_type}</span>
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              {listing.tags && listing.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-2">Etiquetas</h3>
                  <div className="flex flex-wrap gap-2">
                    {listing.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Contact Information */}
              {listing.contact_info && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-2">Información de contacto</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-line">{listing.contact_info}</p>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-8">
                <Button
                  leftIcon={<MessageSquare size={16} />}
                  disabled={user?.id === listing.author_id}
                >
                  Contactar
                </Button>
                <Button
                  variant="outline"
                  leftIcon={<Share2 size={16} />}
                >
                  Compartir
                </Button>
                <Button
                  variant="ghost"
                  leftIcon={<Flag size={16} />}
                >
                  Reportar
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Author Information */}
          {author && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Información del Anunciante</h2>
              
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-4">
                  {author.avatar_url ? (
                    <img 
                      src={author.avatar_url} 
                      alt={author.full_name || 'Usuario'} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-semibold text-xl">
                      {author.full_name?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800">{author.full_name || 'Usuario'}</h3>
                  <p className="text-gray-600 text-sm">{`@${author.username || 'usuario'}`}</p>
                  
                  {ratings.length > 0 && (
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={14} 
                            className={star <= Math.round(averageRating) 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300'} 
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-sm text-gray-600">
                        ({ratings.length} valoraciones)
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {author.bio && (
                <div className="mb-4">
                  <p className="text-gray-700 text-sm">{author.bio}</p>
                </div>
              )}
              
              <div className="space-y-2 text-sm text-gray-600">
                {author.location && (
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-2" />
                    <span>{author.location}</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <Calendar size={14} className="mr-2" />
                  <span>Miembro desde {formatDate(author.created_at)}</span>
                </div>
                
                {author.category && (
                  <div className="flex items-center">
                    <Tag size={14} className="mr-2" />
                    <span>{author.category}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <Link to={`/freelancers/${author.id}`}>
                  <Button variant="outline" fullWidth leftIcon={<User size={16} />}>
                    Ver Perfil Completo
                  </Button>
                </Link>
              </div>
            </div>
          )}
          
          {/* Ratings Preview */}
          {ratings.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Valoraciones</h2>
                <Link to={`/freelancers/${author?.id}#ratings`} className="text-blue-600 text-sm hover:text-blue-700">
                  Ver todas
                </Link>
              </div>
              
              <div className="space-y-4">
                {ratings.slice(0, 2).map((rating) => (
                  <div key={rating.id} className="pb-4 border-b border-gray-100 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 mr-2">
                          {rating.client?.avatar_url ? (
                            <img 
                              src={rating.client.avatar_url} 
                              alt={rating.client.full_name || 'Usuario'} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-600 font-semibold text-sm">
                              {rating.client?.full_name?.charAt(0) || 'U'}
                            </div>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {rating.client?.full_name || 'Usuario'}
                        </span>
                      </div>
                      
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={14} 
                            className={star <= rating.rating 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300'} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    {rating.comment && (
                      <p className="text-sm text-gray-600">{rating.comment}</p>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(rating.created_at)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;