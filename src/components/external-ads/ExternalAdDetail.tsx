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
  DollarSign,
  Database,
  BarChart3,
  Shield,
  X
} from 'lucide-react';
import { ExternalAd } from '../../types/externalAds';
import Button from '../ui/Button';

interface ExternalAdDetailProps {
  ad: ExternalAd;
  onClose: () => void;
}

const ExternalAdDetail: React.FC<ExternalAdDetailProps> = ({ ad, onClose }) => {
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-6xl bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Detalle del Anuncio</h1>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            {/* Featured Badge */}
            {ad.featured && (
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg p-3 mb-6">
                <div className="flex items-center">
                  <Star size={20} className="mr-2 fill-current" />
                  <span className="font-medium">Anuncio Destacado</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Title and Basic Info */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{ad.title}</h2>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {ad.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ad.status)}`}>
                      {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                    </span>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Eye size={16} className="mr-1" />
                      <span>{ad.views.toLocaleString()} vistas</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <Calendar size={16} className="mr-2" />
                    <span>Publicado: {formatDate(ad.postDate)}</span>
                    {ad.expiryDate && (
                      <>
                        <Clock size={16} className="ml-4 mr-2" />
                        <span>Expira: {formatDate(ad.expiryDate)}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Images Gallery */}
                {ad.images.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Imágenes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {ad.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${ad.title} - Imagen ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Descripción</h3>
                  <div className="prose text-gray-700 max-w-none">
                    {ad.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Etiquetas</h3>
                  <div className="flex flex-wrap gap-2">
                    {ad.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Media */}
                {ad.media && ad.media.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Archivos Adjuntos</h3>
                    <div className="space-y-2">
                      {ad.media.map((item, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="mr-3">
                            {item.type === 'image' && <img src={item.url} alt={item.caption} className="w-12 h-12 object-cover rounded" />}
                            {item.type === 'document' && <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">📄</div>}
                            {item.type === 'video' && <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center">🎥</div>}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.caption || 'Archivo adjunto'}</p>
                            <p className="text-sm text-gray-600">{item.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Raw Data Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Database size={20} className="mr-2" />
                    Datos Completos de la Base de Datos
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700 overflow-x-auto whitespace-pre-wrap">
                      {JSON.stringify(ad.rawData, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Price */}
                {ad.price && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-3">Precio</h3>
                    <div className="flex items-center mb-2">
                      <DollarSign size={24} className="text-green-600 mr-2" />
                      <span className="text-2xl font-bold text-green-600">
                        {ad.price.amount.toLocaleString()} {ad.price.currency}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {ad.price.type === 'hourly' ? 'Por hora' : 
                       ad.price.type === 'fixed' ? 'Precio fijo' : 'Negociable'}
                    </p>
                  </div>
                )}

                {/* User Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-3">Información del Usuario</h3>
                  
                  <div className="flex items-center mb-4">
                    <img 
                      src={ad.user.avatar || 'https://via.placeholder.com/60'} 
                      alt={ad.user.name}
                      className="w-15 h-15 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{ad.user.name}</h4>
                      <p className="text-gray-600 text-sm">{ad.user.email}</p>
                      {ad.user.location && (
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <MapPin size={12} className="mr-1" />
                          <span>{ad.user.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <User size={14} className="mr-2" />
                      <span>Miembro desde: {formatDate(ad.user.joinDate)}</span>
                    </div>
                  </div>

                  <Button fullWidth>
                    Contactar Usuario
                  </Button>
                </div>

                {/* Contact Information */}
                {ad.contactInfo && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-3">Información de Contacto</h3>
                    
                    <div className="space-y-3">
                      {ad.contactInfo.phone && (
                        <div className="flex items-center">
                          <Phone size={16} className="text-gray-400 mr-3" />
                          <span className="text-gray-700">{ad.contactInfo.phone}</span>
                        </div>
                      )}
                      {ad.contactInfo.email && (
                        <div className="flex items-center">
                          <Mail size={16} className="text-gray-400 mr-3" />
                          <span className="text-gray-700">{ad.contactInfo.email}</span>
                        </div>
                      )}
                      {ad.contactInfo.website && (
                        <div className="flex items-center">
                          <Globe size={16} className="text-gray-400 mr-3" />
                          <a 
                            href={ad.contactInfo.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            {ad.contactInfo.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Engagement Metrics */}
                {ad.rawData.engagement_metrics && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <BarChart3 size={20} className="mr-2" />
                      Métricas de Engagement
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Clics:</span>
                        <span className="font-medium">{ad.rawData.engagement_metrics.clicks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guardados:</span>
                        <span className="font-medium">{ad.rawData.engagement_metrics.saves}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Compartidos:</span>
                        <span className="font-medium">{ad.rawData.engagement_metrics.shares}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Consultas:</span>
                        <span className="font-medium">{ad.rawData.engagement_metrics.inquiries}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Puntuación de Calidad:</span>
                        <div className="flex items-center">
                          <Shield size={16} className="text-green-500 mr-1" />
                          <span className="font-bold text-green-600">{ad.rawData.quality_score}/10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalAdDetail;