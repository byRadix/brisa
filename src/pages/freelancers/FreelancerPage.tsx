import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Mail, ExternalLink, Star, Briefcase, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import Button from '../../components/ui/Button';
import ListingCard from '../../components/marketplace/ListingCard';

interface Profile {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  location: string | null;
  skills: string[] | null;
  hourly_rate: number | null;
  category: string | null;
  availability: string | null;
  created_at: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link: string | null;
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

interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  price_type: string;
  image_url: string | null;
  created_at: string;
  author_id: string;
  author: Profile | null;
  location: string | null;
}

const FreelancerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('portfolio');
  const [averageRating, setAverageRating] = useState(0);
  
  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        if (!id) return;
        
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();
          
        if (profileError) throw profileError;
        setProfile(profileData);
        
        // Fetch portfolio items
        const { data: portfolioData, error: portfolioError } = await supabase
          .from('portfolio_items')
          .select('*')
          .eq('profile_id', id)
          .order('created_at', { ascending: false });
          
        if (portfolioError) throw portfolioError;
        setPortfolioItems(portfolioData);
        
        // Fetch ratings
        const { data: ratingsData, error: ratingsError } = await supabase
          .from('ratings')
          .select(`
            *,
            client:profiles(full_name, username, avatar_url)
          `)
          .eq('freelancer_id', id)
          .order('created_at', { ascending: false });
          
        if (ratingsError) throw ratingsError;
        setRatings(ratingsData);
        
        // Calculate average rating
        if (ratingsData.length > 0) {
          const sum = ratingsData.reduce((acc, curr) => acc + curr.rating, 0);
          setAverageRating(sum / ratingsData.length);
        }
        
        // Fetch listings
        const { data: listingsData, error: listingsError } = await supabase
          .from('listings')
          .select('*')
          .eq('author_id', id)
          .eq('status', 'active')
          .order('created_at', { ascending: false });
          
        if (listingsError) throw listingsError;
        
        const enrichedListings = listingsData.map(listing => ({
          ...listing,
          author: profileData
        }));
        
        setListings(enrichedListings);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfileData();
  }, [id]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
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
  
  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Freelancer no encontrado</h1>
          <p className="text-gray-600 mb-6">Lo sentimos, el perfil que buscas no existe o ha sido eliminado.</p>
          <Link to="/freelancers/explore">
            <Button>Explorar Freelancers</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-400 relative"></div>
        
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 mb-6">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-md">
              {profile.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt={profile.full_name || 'Freelancer'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-4xl">
                  {profile.full_name?.charAt(0) || 'F'}
                </div>
              )}
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
              <h1 className="text-2xl font-bold text-gray-800">{profile.full_name}</h1>
              <p className="text-gray-600">{`@${profile.username || 'usuario'}`}</p>
              
              {profile.category && (
                <div className="mt-1">
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {profile.category}
                  </span>
                </div>
              )}
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
              <Button leftIcon={<Mail size={16} />}>
                Contactar
              </Button>
              
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" leftIcon={<ExternalLink size={16} />}>
                    Sitio Web
                  </Button>
                </a>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {/* Bio */}
              {profile.bio && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Acerca de</h2>
                  <p className="text-gray-700">{profile.bio}</p>
                </div>
              )}
              
              {/* Skills */}
              {profile.skills && profile.skills.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Habilidades</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {/* Info Card */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-3">
                  {profile.location && (
                    <div className="flex items-center text-gray-700">
                      <MapPin size={16} className="mr-2 text-gray-500" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-gray-700">
                    <Calendar size={16} className="mr-2 text-gray-500" />
                    <span>Miembro desde {formatDate(profile.created_at)}</span>
                  </div>
                  
                  {profile.hourly_rate !== null && (
                    <div className="flex items-center text-gray-700">
                      <Briefcase size={16} className="mr-2 text-gray-500" />
                      <span>${profile.hourly_rate}/hora</span>
                    </div>
                  )}
                  
                  {profile.availability && (
                    <div className="flex items-center text-gray-700">
                      <Clock size={16} className="mr-2 text-gray-500" />
                      <span>{profile.availability}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Rating Summary */}
              {ratings.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Valoración</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={16} 
                          className={star <= Math.round(averageRating) 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-700 font-medium">{averageRating.toFixed(1)}</span>
                    <span className="text-gray-500 text-sm ml-1">({ratings.length} valoraciones)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'portfolio'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Portafolio
            </button>
            
            <button
              onClick={() => setActiveTab('services')}
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'services'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Servicios ({listings.length})
            </button>
            
            <button
              onClick={() => setActiveTab('ratings')}
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'ratings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Valoraciones ({ratings.length})
            </button>
          </nav>
        </div>
      </div>
      
      {/* Tab Content */}
      <div>
        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div>
            {portfolioItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h2 className="text-xl font-medium text-gray-800 mb-2">No hay elementos en el portafolio</h2>
                <p className="text-gray-600">
                  Este freelancer aún no ha añadido elementos a su portafolio.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {item.image_url && (
                      <div className="h-48 w-full">
                        <img 
                          src={item.image_url} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">{item.title}</h3>
                      {item.description && (
                        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                      )}
                      {item.link && (
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm inline-flex items-center"
                        >
                          Ver proyecto <ExternalLink size={14} className="ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            {listings.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h2 className="text-xl font-medium text-gray-800 mb-2">No hay servicios disponibles</h2>
                <p className="text-gray-600">
                  Este freelancer aún no ha publicado servicios en el marketplace.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Ratings Tab */}
        {activeTab === 'ratings' && (
          <div>
            {ratings.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h2 className="text-xl font-medium text-gray-800 mb-2">No hay valoraciones disponibles</h2>
                <p className="text-gray-600">
                  Este freelancer aún no ha recibido valoraciones.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">
                  Valoraciones y Opiniones ({ratings.length})
                </h2>
                
                <div className="space-y-6">
                  {ratings.map((rating) => (
                    <div key={rating.id} className="pb-6 border-b border-gray-100 last:border-0">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-4">
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
                        
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-800">
                                {rating.client?.full_name || 'Usuario'}
                              </h3>
                              <div className="flex items-center mt-1">
                                <div className="flex mr-2">
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
                                <span className="text-gray-500 text-sm">
                                  {formatDate(rating.created_at)}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {rating.comment && (
                            <p className="mt-3 text-gray-700">{rating.comment}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerPage;