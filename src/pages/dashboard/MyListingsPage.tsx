import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  MessageSquare, 
  Edit, 
  Trash2, 
  TrendingUp, 
  Search, 
  Filter,
  MoreHorizontal,
  Calendar,
  BarChart3,
  Users,
  Clock,
  Target
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import toast from 'react-hot-toast';

interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  price_type: string;
  image_urls: string[] | null;
  status: string;
  created_at: string;
  updated_at: string;
  views_count?: number;
  inquiries_count?: number;
}

interface ListingStats {
  totalViews: number;
  totalInquiries: number;
  conversionRate: number;
  avgResponseTime: number;
}

const MyListingsPage: React.FC = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [stats, setStats] = useState<ListingStats>({
    totalViews: 0,
    totalInquiries: 0,
    conversionRate: 0,
    avgResponseTime: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('updated_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (user) {
      fetchListings();
      fetchStats();
    }
  }, [user, statusFilter, sortBy, sortOrder]);

  const fetchListings = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('listings')
        .select('*')
        .eq('author_id', user!.id);

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }

      query = query.order(sortBy, { ascending: sortOrder === 'asc' });

      const { data, error } = await query;

      if (error) throw error;

      // Add mock data for views and inquiries (in a real app, these would come from analytics tables)
      const enrichedListings = data?.map(listing => ({
        ...listing,
        views_count: Math.floor(Math.random() * 500) + 10,
        inquiries_count: Math.floor(Math.random() * 20) + 1
      })) || [];

      setListings(enrichedListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast.error('Error al cargar los anuncios');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // In a real app, these would be calculated from actual analytics data
      const totalViews = listings.reduce((sum, listing) => sum + (listing.views_count || 0), 0);
      const totalInquiries = listings.reduce((sum, listing) => sum + (listing.inquiries_count || 0), 0);
      const conversionRate = totalViews > 0 ? (totalInquiries / totalViews) * 100 : 0;
      
      setStats({
        totalViews,
        totalInquiries,
        conversionRate,
        avgResponseTime: 2.5 // Mock average response time in hours
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleDeleteListing = async (listingId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este anuncio?')) return;

    try {
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', listingId);

      if (error) throw error;

      toast.success('Anuncio eliminado correctamente');
      fetchListings();
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast.error('Error al eliminar el anuncio');
    }
  };

  const handleStatusChange = async (listingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('listings')
        .update({ status: newStatus })
        .eq('id', listingId);

      if (error) throw error;

      toast.success('Estado actualizado correctamente');
      fetchListings();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Error al actualizar el estado');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };

    const labels = {
      active: 'Activo',
      inactive: 'Inactivo',
      pending: 'Pendiente'
    };

    return (
      <span className={`${styles[status as keyof typeof styles]} px-2 py-1 rounded-full text-xs font-medium`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mis Anuncios</h1>
          <p className="text-gray-600">Gestiona tus anuncios y revisa su rendimiento</p>
        </div>
        <Link to="/dashboard/create-listing">
          <Button>Crear Nuevo Anuncio</Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Vistas Totales</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalViews.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Consultas</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalInquiries}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tasa de Conversión</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.conversionRate.toFixed(1)}%</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tiempo de Respuesta</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.avgResponseTime}h</h3>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar anuncios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search size={18} />}
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
            <option value="pending">Pendientes</option>
          </select>

          <select
            value={`${sortBy}_${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('_');
              setSortBy(field);
              setSortOrder(order as 'asc' | 'desc');
            }}
            className="rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          >
            <option value="updated_at_desc">Más recientes</option>
            <option value="created_at_desc">Fecha de creación</option>
            <option value="title_asc">Título A-Z</option>
            <option value="price_desc">Precio mayor</option>
            <option value="price_asc">Precio menor</option>
          </select>

          <Button onClick={fetchListings}>
            <Filter size={16} className="mr-2" />
            Aplicar
          </Button>
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {listings.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium text-gray-800 mb-2">No tienes anuncios</h3>
            <p className="text-gray-600 mb-4">Crea tu primer anuncio para comenzar a recibir clientes</p>
            <Link to="/dashboard/create-listing">
              <Button>Crear Anuncio</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Anuncio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vistas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Consultas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actualizado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {listings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          {listing.image_urls && listing.image_urls.length > 0 ? (
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={listing.image_urls[0]}
                              alt={listing.title}
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400 text-xs">Sin imagen</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {listing.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {listing.category} • ${listing.price}/{listing.price_type}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(listing.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Eye size={16} className="mr-1 text-gray-400" />
                        {listing.views_count || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <MessageSquare size={16} className="mr-1 text-gray-400" />
                        {listing.inquiries_count || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(listing.updated_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link to={`/marketplace/${listing.id}`}>
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye size={16} />
                          </button>
                        </Link>
                        <Link to={`/dashboard/edit-listing/${listing.id}`}>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteListing(listing.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} />
                        </button>
                        <div className="relative group">
                          <button className="text-gray-600 hover:text-gray-900">
                            <MoreHorizontal size={16} />
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                            <div className="py-1">
                              <button
                                onClick={() => handleStatusChange(listing.id, listing.status === 'active' ? 'inactive' : 'active')}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                {listing.status === 'active' ? 'Desactivar' : 'Activar'}
                              </button>
                              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                Impulsar anuncio
                              </button>
                              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                Duplicar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListingsPage;