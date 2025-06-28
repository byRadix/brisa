import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  MessageSquare, 
  Star, 
  Users,
  Calendar,
  Target,
  Clock,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ChartData {
  name: string;
  views: number;
  inquiries: number;
  conversions: number;
}

interface PerformanceMetrics {
  totalViews: number;
  totalInquiries: number;
  conversionRate: number;
  avgRating: number;
  totalEarnings: number;
  responseTime: number;
  profileViews: number;
  repeatClients: number;
}

const StatsPage: React.FC = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30d');
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    totalViews: 0,
    totalInquiries: 0,
    conversionRate: 0,
    avgRating: 0,
    totalEarnings: 0,
    responseTime: 0,
    profileViews: 0,
    repeatClients: 0
  });
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [timeRange]);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      // Mock data for demonstration
      const mockMetrics: PerformanceMetrics = {
        totalViews: 2847,
        totalInquiries: 156,
        conversionRate: 5.5,
        avgRating: 4.8,
        totalEarnings: 12450,
        responseTime: 2.3,
        profileViews: 892,
        repeatClients: 23
      };

      const mockChartData: ChartData[] = [
        { name: 'Ene', views: 420, inquiries: 24, conversions: 3 },
        { name: 'Feb', views: 380, inquiries: 18, conversions: 2 },
        { name: 'Mar', views: 520, inquiries: 32, conversions: 4 },
        { name: 'Abr', views: 610, inquiries: 28, conversions: 5 },
        { name: 'May', views: 480, inquiries: 22, conversions: 3 },
        { name: 'Jun', views: 437, inquiries: 32, conversions: 4 }
      ];

      setMetrics(mockMetrics);
      setChartData(mockChartData);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ 
    title, 
    value, 
    icon, 
    trend, 
    trendValue, 
    color = 'blue' 
  }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: 'up' | 'down';
    trendValue?: string;
    color?: string;
  }) => {
    const colorClasses = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600',
      yellow: 'bg-yellow-100 text-yellow-600'
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
            {trend && trendValue && (
              <div className={`flex items-center mt-2 text-sm ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className={`w-4 h-4 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color as keyof typeof colorClasses]}`}>
            {icon}
          </div>
        </div>
      </div>
    );
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
          <h1 className="text-2xl font-bold text-gray-800">Estadísticas</h1>
          <p className="text-gray-600">Analiza el rendimiento de tu perfil y anuncios</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        >
          <option value="7d">Últimos 7 días</option>
          <option value="30d">Últimos 30 días</option>
          <option value="90d">Últimos 3 meses</option>
          <option value="1y">Último año</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Vistas Totales"
          value={metrics.totalViews.toLocaleString()}
          icon={<Eye className="w-6 h-6" />}
          trend="up"
          trendValue="+12.5%"
          color="blue"
        />
        <StatCard
          title="Consultas Recibidas"
          value={metrics.totalInquiries}
          icon={<MessageSquare className="w-6 h-6" />}
          trend="up"
          trendValue="+8.3%"
          color="green"
        />
        <StatCard
          title="Tasa de Conversión"
          value={`${metrics.conversionRate}%`}
          icon={<Target className="w-6 h-6" />}
          trend="up"
          trendValue="+2.1%"
          color="purple"
        />
        <StatCard
          title="Valoración Media"
          value={metrics.avgRating.toFixed(1)}
          icon={<Star className="w-6 h-6" />}
          trend="up"
          trendValue="+0.2"
          color="yellow"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ingresos Totales"
          value={`$${metrics.totalEarnings.toLocaleString()}`}
          icon={<DollarSign className="w-6 h-6" />}
          trend="up"
          trendValue="+15.7%"
          color="green"
        />
        <StatCard
          title="Tiempo de Respuesta"
          value={`${metrics.responseTime}h`}
          icon={<Clock className="w-6 h-6" />}
          trend="down"
          trendValue="-0.5h"
          color="orange"
        />
        <StatCard
          title="Vistas de Perfil"
          value={metrics.profileViews}
          icon={<Users className="w-6 h-6" />}
          trend="up"
          trendValue="+18.2%"
          color="blue"
        />
        <StatCard
          title="Clientes Recurrentes"
          value={metrics.repeatClients}
          icon={<Users className="w-6 h-6" />}
          trend="up"
          trendValue="+3"
          color="purple"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Rendimiento Mensual</h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {chartData.map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{data.name}</span>
                  <span className="text-gray-500">{data.views} vistas</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(data.views / 700) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Embudo de Conversión</h2>
            <Target className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="font-medium text-gray-700">Vistas de Anuncios</span>
              </div>
              <span className="font-bold text-blue-600">{metrics.totalViews.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="font-medium text-gray-700">Consultas</span>
              </div>
              <span className="font-bold text-green-600">{metrics.totalInquiries}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span className="font-medium text-gray-700">Conversiones</span>
              </div>
              <span className="font-bold text-purple-600">
                {Math.round(metrics.totalInquiries * (metrics.conversionRate / 100))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Listings */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Anuncios con Mejor Rendimiento</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Anuncio</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Vistas</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Consultas</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Conversión</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Ingresos</th>
              </tr>
            </thead>
            <tbody>
              {[
                { title: 'Diseño de Logotipos Profesionales', views: 1250, inquiries: 45, conversion: '3.6%', earnings: '$2,850' },
                { title: 'Desarrollo Web Completo', views: 890, inquiries: 32, conversion: '3.6%', earnings: '$4,200' },
                { title: 'Marketing Digital para PyMEs', views: 707, inquiries: 28, conversion: '4.0%', earnings: '$1,680' }
              ].map((listing, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">{listing.title}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{listing.views.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">{listing.inquiries}</td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 font-medium">{listing.conversion}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-blue-600 font-medium">{listing.earnings}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;