import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  User, 
  MessageSquare, 
  Share2, 
  Flag, 
  Star, 
  Tag, 
  Heart,
  Shield,
  Eye,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Phone,
  Mail
} from 'lucide-react';
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
  const [otherListings, setOtherListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  
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

          // Fetch other listings from the same author
          const { data: otherListingsData, error: otherListingsError } = await supabase
            .from('listings')
            .select('*')
            .eq('author_id', listingData.author_id)
            .eq('status', 'active')
            .neq('id', id)
            .order('created_at', { ascending: false })
            .limit(4);

          if (otherListingsError) throw otherListingsError;
          setOtherListings(otherListingsData || []);
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

  const nextImage = () => {
    const images = getImages();
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = getImages();
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    // In a real app, this would save to the database
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= Math.round(rating) 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-300'}
          />
        ))}
      </div>
    );
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
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link to="/marketplace" className="text-blue-600 hover:text-blue-700 inline-flex items-center">
            ← Volver al Marketplace
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - 60% width (3/5) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Main Image */}
              <div className="relative">
                <div className="aspect-[4/3] w-full">
                  <img 
                    src={images[selectedImageIndex]} 
                    alt={listing.title} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {listing.category}
                    </span>
                  </div>

                  {/* Image Navigation */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {selectedImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>

                {/* Image Thumbnails */}
                {images.length > 1 && (
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex space-x-2 overflow-x-auto">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                            selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
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

              {/* Product Details */}
              <div className="p-6">
                {/* Title and Price */}
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl font-bold text-gray-900 flex-1 mr-4">{listing.title}</h1>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      ${listing.price}
                    </div>
                    <div className="text-sm text-gray-500">
                      por {listing.price_type}
                    </div>
                  </div>
                </div>

                {/* Meta Information */}
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
                    <Eye size={16} className="mr-1" />
                    <span>{Math.floor(Math.random() * 500) + 50} vistas</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <Button
                    leftIcon={<MessageSquare size={16} />}
                    disabled={user?.id === listing.author_id}
                    className="flex-1 sm:flex-none"
                  >
                    Contactar Vendedor
                  </Button>
                  <Button
                    variant="outline"
                    leftIcon={<Heart size={16} className={isFavorited ? 'fill-red-500 text-red-500' : ''} />}
                    onClick={handleFavorite}
                  >
                    {isFavorited ? 'Guardado' : 'Guardar'}
                  </Button>
                  <Button
                    variant="outline"
                    leftIcon={<Share2 size={16} />}
                  >
                    Compartir
                  </Button>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">Descripción</h2>
                  <div className="prose text-gray-700 max-w-none">
                    {listing.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-3">{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                {listing.tags && listing.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-3">Etiquetas</h3>
                    <div className="flex flex-wrap gap-2">
                      {listing.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                {listing.contact_info && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Información de contacto</h3>
                    <div className="text-gray-700 whitespace-pre-line text-sm">
                      {listing.contact_info}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - 40% width (2/5) */}
          <div className="lg:col-span-2">
            {/* Seller Profile */}
            {author && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Información del Vendedor</h2>
                
                {/* Profile Header */}
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
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
                    {/* Verification Badge */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Shield size={12} className="text-white" />
                    </div>
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold text-gray-900">{author.full_name || 'Usuario'}</h3>
                    <p className="text-gray-600 text-sm">@{author.username || 'usuario'}</p>
                    
                    {/* Rating */}
                    {ratings.length > 0 && (
                      <div className="flex items-center mt-1">
                        {renderStars(averageRating)}
                        <span className="ml-2 text-sm text-gray-600">
                          {averageRating.toFixed(1)} ({ratings.length} reseñas)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Seller Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-gray-900">Miembro desde</div>
                    <div className="text-gray-600">{formatDate(author.created_at)}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-semibold text-gray-900">Tasa de respuesta</div>
                    <div className="text-green-600 font-medium">95%</div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  {author.location && (
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-2" />
                      <span>{author.location}</span>
                    </div>
                  )}
                  
                  {author.category && (
                    <div className="flex items-center">
                      <Tag size={14} className="mr-2" />
                      <span>{author.category}</span>
                    </div>
                  )}

                  {author.availability && (
                    <div className="flex items-center">
                      <Clock size={14} className="mr-2" />
                      <span>{author.availability}</span>
                    </div>
                  )}
                </div>

                {/* Bio */}
                {author.bio && (
                  <div className="mb-4">
                    <p className="text-gray-700 text-sm">{author.bio}</p>
                  </div>
                )}

                {/* Contact Buttons */}
                <div className="space-y-2">
                  <Button fullWidth leftIcon={<MessageSquare size={16} />}>
                    Enviar Mensaje
                  </Button>
                  <Link to={`/freelancers/${author.id}`}>
                    <Button variant="outline" fullWidth leftIcon={<User size={16} />}>
                      Ver Perfil Completo
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Other Listings from Seller */}
            {otherListings.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Otros anuncios de este vendedor</h3>
                <div className="grid grid-cols-2 gap-3">
                  {otherListings.map((otherListing) => (
                    <Link
                      key={otherListing.id}
                      to={`/marketplace/${otherListing.id}`}
                      className="group block"
                    >
                      <div className="aspect-square rounded-lg overflow-hidden mb-2">
                        <img
                          src={otherListing.image_urls?.[0] || otherListing.image_url || defaultImage}
                          alt={otherListing.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {otherListing.title}
                      </h4>
                      <p className="text-sm text-blue-600 font-semibold mt-1">
                        ${otherListing.price}
                      </p>
                    </Link>
                  ))}
                </div>
                
                {otherListings.length >= 4 && (
                  <Link to={`/freelancers/${author?.id}`} className="block mt-4">
                    <Button variant="outline" fullWidth size="sm">
                      Ver todos los anuncios
                    </Button>
                  </Link>
                )}
              </div>
            )}

            {/* Recent Reviews */}
            {ratings.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Reseñas Recientes</h3>
                  <Link to={`/freelancers/${author?.id}#ratings`} className="text-blue-600 text-sm hover:text-blue-700">
                    Ver todas
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {ratings.slice(0, 3).map((rating) => (
                    <div key={rating.id} className="pb-4 border-b border-gray-100 last:border-0">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
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
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {rating.client?.full_name || 'Usuario'}
                            </span>
                            {renderStars(rating.rating)}
                          </div>
                          
                          {rating.comment && (
                            <p className="text-sm text-gray-600 mb-1">{rating.comment}</p>
                          )}
                          
                          <p className="text-xs text-gray-500">
                            {formatDate(rating.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Report Button */}
            <div className="mt-6">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Flag size={16} />}
                className="text-gray-500 hover:text-gray-700"
              >
                Reportar este anuncio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;