import React, { useState, useEffect } from 'react';
import { 
  Star, 
  MessageSquare, 
  Flag, 
  TrendingUp, 
  TrendingDown,
  Filter,
  Search,
  Calendar,
  BarChart3,
  Users,
  Award
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import toast from 'react-hot-toast';

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  client: {
    id: string;
    full_name: string | null;
    username: string | null;
    avatar_url: string | null;
  } | null;
  listing_id: string | null;
  reply?: string;
}

interface ReviewStats {
  overallRating: number;
  totalReviews: number;
  ratingDistribution: { [key: number]: number };
  monthlyTrend: number;
  categoryAverage: number;
}

const ReviewsPage: React.FC = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats>({
    overallRating: 0,
    totalReviews: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    monthlyTrend: 0,
    categoryAverage: 4.2
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchReviews();
    }
  }, [user, ratingFilter, sortBy]);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('ratings')
        .select(`
          *,
          client:profiles(id, full_name, username, avatar_url)
        `)
        .eq('freelancer_id', user!.id);

      if (ratingFilter !== 'all') {
        query = query.eq('rating', parseInt(ratingFilter));
      }

      if (searchTerm) {
        query = query.ilike('comment', `%${searchTerm}%`);
      }

      query = query.order(sortBy, { ascending: false });

      const { data, error } = await query;

      if (error) throw error;

      // Add mock replies for demonstration
      const reviewsWithReplies = data?.map(review => ({
        ...review,
        reply: Math.random() > 0.7 ? 'Gracias por tu comentario. Me alegra saber que quedaste satisfecho con el trabajo.' : undefined
      })) || [];

      setReviews(reviewsWithReplies);
      calculateStats(reviewsWithReplies);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Error al cargar las valoraciones');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (reviewsData: Review[]) => {
    if (reviewsData.length === 0) {
      setStats({
        overallRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        monthlyTrend: 0,
        categoryAverage: 4.2
      });
      return;
    }

    const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0);
    const overallRating = totalRating / reviewsData.length;

    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviewsData.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });

    // Calculate monthly trend (mock calculation)
    const currentMonth = new Date().getMonth();
    const currentMonthReviews = reviewsData.filter(review => 
      new Date(review.created_at).getMonth() === currentMonth
    ).length;
    const lastMonthReviews = reviewsData.filter(review => 
      new Date(review.created_at).getMonth() === currentMonth - 1
    ).length;
    
    const monthlyTrend = lastMonthReviews > 0 
      ? ((currentMonthReviews - lastMonthReviews) / lastMonthReviews) * 100 
      : 0;

    setStats({
      overallRating,
      totalReviews: reviewsData.length,
      ratingDistribution: distribution,
      monthlyTrend,
      categoryAverage: 4.2
    });
  };

  const handleReply = async (reviewId: string) => {
    const reply = replyText[reviewId];
    if (!reply?.trim()) return;

    try {
      // In a real app, you would save the reply to the database
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { ...review, reply }
          : review
      ));
      
      setReplyText(prev => ({ ...prev, [reviewId]: '' }));
      setShowReplyForm(null);
      toast.success('Respuesta enviada correctamente');
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Error al enviar la respuesta');
    }
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
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
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Valoraciones y Reseñas</h1>
        <p className="text-gray-600">Gestiona las valoraciones de tus clientes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Valoración General</p>
              <div className="flex items-center space-x-2">
                <h3 className={`text-2xl font-bold ${getRatingColor(stats.overallRating)}`}>
                  {stats.overallRating.toFixed(1)}
                </h3>
                {renderStars(Math.round(stats.overallRating), 'sm')}
              </div>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Reseñas</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalReviews}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tendencia Mensual</p>
              <div className="flex items-center space-x-1">
                <h3 className={`text-2xl font-bold ${stats.monthlyTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.monthlyTrend >= 0 ? '+' : ''}{stats.monthlyTrend.toFixed(1)}%
                </h3>
                {stats.monthlyTrend >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Promedio Categoría</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.categoryAverage}</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Distribución de Valoraciones</h2>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 w-16">
                <span className="text-sm font-medium">{rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{
                    width: `${stats.totalReviews > 0 ? (stats.ratingDistribution[rating] / stats.totalReviews) * 100 : 0}%`
                  }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-8">
                {stats.ratingDistribution[rating]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar en comentarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search size={18} />}
            />
          </div>
          
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          >
            <option value="all">Todas las valoraciones</option>
            <option value="5">5 estrellas</option>
            <option value="4">4 estrellas</option>
            <option value="3">3 estrellas</option>
            <option value="2">2 estrellas</option>
            <option value="1">1 estrella</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          >
            <option value="created_at">Más recientes</option>
            <option value="rating">Valoración</option>
          </select>

          <Button onClick={fetchReviews}>
            <Filter size={16} className="mr-2" />
            Aplicar
          </Button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No tienes valoraciones</h3>
            <p className="text-gray-600">
              Las valoraciones de tus clientes aparecerán aquí una vez que completes tus primeros trabajos.
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {review.client?.avatar_url ? (
                    <img
                      src={review.client.avatar_url}
                      alt={review.client.full_name || 'Cliente'}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <Users className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {review.client?.full_name || 'Cliente'}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {renderStars(review.rating, 'sm')}
                        <span className="text-sm text-gray-500">
                          {formatDate(review.created_at)}
                        </span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Flag size={16} />
                    </button>
                  </div>

                  {review.comment && (
                    <p className="text-gray-700 mb-4">{review.comment}</p>
                  )}

                  {review.reply ? (
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-blue-800">Tu respuesta:</span>
                      </div>
                      <p className="text-blue-700">{review.reply}</p>
                    </div>
                  ) : (
                    <div>
                      {showReplyForm === review.id ? (
                        <div className="space-y-3">
                          <textarea
                            value={replyText[review.id] || ''}
                            onChange={(e) => setReplyText(prev => ({ ...prev, [review.id]: e.target.value }))}
                            placeholder="Escribe tu respuesta..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                            rows={3}
                          />
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleReply(review.id)}
                              disabled={!replyText[review.id]?.trim()}
                            >
                              Enviar Respuesta
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setShowReplyForm(null)}
                            >
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowReplyForm(review.id)}
                          leftIcon={<MessageSquare size={16} />}
                        >
                          Responder
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;