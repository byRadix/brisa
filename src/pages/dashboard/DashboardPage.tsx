import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText, MessageSquare, Star, Users, BarChart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import Button from '../../components/ui/Button';

interface ProfileData {
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
}

interface Stats {
  listingsCount: number;
  viewsCount: number;
  ratingsCount: number;
  averageRating: number;
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [stats, setStats] = useState<Stats>({
    listingsCount: 0,
    viewsCount: 0,
    ratingsCount: 0,
    averageRating: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndStats = async () => {
      setIsLoading(true);
      try {
        if (user) {
          // Fetch profile data with maybeSingle() to handle no results gracefully
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('full_name, username, avatar_url')
            .eq('id', user.id)
            .maybeSingle();
            
          if (profileError) throw profileError;
          
          // Set profile data (will be null if no profile exists)
          setProfile(profileData || {
            full_name: null,
            username: null,
            avatar_url: null
          });
          
          // Fetch listings count
          const { count: listingsCount, error: listingsError } = await supabase
            .from('listings')
            .select('*', { count: 'exact', head: true })
            .eq('author_id', user.id);
            
          if (listingsError) throw listingsError;
          
          // Fetch ratings
          const { data: ratingsData, error: ratingsError } = await supabase
            .from('ratings')
            .select('rating')
            .eq('freelancer_id', user.id);
            
          if (ratingsError) throw ratingsError;
          
          const ratingsCount = ratingsData?.length || 0;
          const totalRating = ratingsData?.reduce((sum, item) => sum + item.rating, 0) || 0;
          const averageRating = ratingsCount > 0 ? totalRating / ratingsCount : 0;
          
          setStats({
            listingsCount: listingsCount || 0,
            viewsCount: 0, // We would track this separately
            ratingsCount,
            averageRating
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Set default values in case of error
        setProfile({
          full_name: null,
          username: null,
          avatar_url: null
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfileAndStats();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Bienvenido, {profile?.full_name || user?.email?.split('@')[0]}
        </h1>
        <p className="text-gray-600">
          Administra tu cuenta, anuncios y revisa tus estadísticas
        </p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600 mr-4">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Anuncios Activos</p>
              <h2 className="text-2xl font-bold text-gray-800">{stats.listingsCount}</h2>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full text-green-600 mr-4">
              <Users size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Vistas Totales</p>
              <h2 className="text-2xl font-bold text-gray-800">{stats.viewsCount}</h2>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full text-yellow-600 mr-4">
              <Star size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Valoraciones</p>
              <h2 className="text-2xl font-bold text-gray-800">{stats.ratingsCount}</h2>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full text-purple-600 mr-4">
              <BarChart size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Valoración Media</p>
              <h2 className="text-2xl font-bold text-gray-800">
                {stats.averageRating.toFixed(1)}
                <span className="text-sm text-gray-500 font-normal">/5</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/dashboard/create-listing">
            <Button 
              variant="primary" 
              fullWidth
              leftIcon={<PlusCircle size={18} />}
            >
              Crear Nuevo Anuncio
            </Button>
          </Link>
          
          <Link to="/dashboard/profile">
            <Button 
              variant="outline" 
              fullWidth
            >
              Actualizar Perfil
            </Button>
          </Link>
          
          <Link to="/dashboard/messages">
            <Button 
              variant="outline" 
              fullWidth
            >
              Ver Mensajes
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Complete Your Profile */}
      {(!profile?.avatar_url || !profile?.username) && (
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <h2 className="text-lg font-medium text-blue-800 mb-2">Completa tu Perfil</h2>
          <p className="text-blue-700 mb-4">
            Un perfil completo aumenta la visibilidad y genera más confianza en tus posibles clientes.
          </p>
          <Link to="/dashboard/profile">
            <Button variant="primary" size="sm">
              Completar Perfil
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;