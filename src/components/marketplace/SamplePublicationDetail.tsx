import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Star, 
  MessageSquare, 
  Share2, 
  Flag, 
  Heart,
  Shield,
  Eye,
  ChevronLeft,
  ChevronRight,
  User,
  Tag,
  Clock
} from 'lucide-react';
import { getSamplePublicationById } from '../../data/samplePublications';
import Button from '../ui/Button';
import PublicationMapView from '../ui/PublicationMapView';
import ModalityBadge from '../ui/ModalityBadge';
import RemoteWorkInfo from '../ui/RemoteWorkInfo';
import PresentialWorkInfo from '../ui/PresentialWorkInfo';

const SamplePublicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const publication = id ? getSamplePublicationById(id) : null;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  if (!publication) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Publicación no encontrada</h1>
          <p className="text-gray-600 mb-6">Esta es una publicación de ejemplo que no existe.</p>
          <Link to="/marketplace">
            <Button>Volver al Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getConditionColor = (condition: string) => {
    if (condition.includes('Como nuevo')) return 'bg-green-100 text-green-800';
    if (condition.includes('Buen estado')) return 'bg-blue-100 text-blue-800';
    if (condition.includes('Regular')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % publication.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + publication.images.length) % publication.images.length);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
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

  // Mock data for demonstration
  const mockReviews = [
    {
      id: '1',
      name: 'María López',
      rating: 5,
      comment: 'Excelente vendedor, muy confiable y el producto llegó en perfectas condiciones.',
      date: '2024-01-10'
    },
    {
      id: '2',
      name: 'Roberto Silva',
      rating: 5,
      comment: 'Muy profesional, respondió todas mis dudas rápidamente.',
      date: '2024-01-05'
    }
  ];

  const mockOtherListings = [
    {
      id: 'other1',
      title: 'MacBook Air M1 - 256GB',
      price: 1299.99,
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'other2',
      title: 'iPad Pro 11" - 128GB',
      price: 749.99,
      image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/marketplace" className="text-blue-600 hover:text-blue-700">
              Marketplace
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Publicación de Ejemplo</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Example Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <Eye size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium text-blue-800">Publicación de Ejemplo</h3>
              <p className="text-blue-700 text-sm">
                Esta es una publicación de muestra con datos ficticios para demostrar el diseño y funcionalidad.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - 60% width (3/5) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Main Image */}
              <div className="relative">
                <div className="aspect-[4/3] w-full">
                  <img 
                    src={publication.images[selectedImageIndex]} 
                    alt={publication.title} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {publication.category}
                    </span>
                    <span className={`text-sm px-3 py-1 rounded-full font-medium ${getConditionColor(publication.condition)}`}>
                      {publication.condition}
                    </span>
                    <ModalityBadge modality={publication.modality} size="md" />
                  </div>

                  {/* Image Navigation */}
                  {publication.images.length > 1 && (
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
                  {publication.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {selectedImageIndex + 1} / {publication.images.length}
                    </div>
                  )}
                </div>

                {/* Image Thumbnails */}
                {publication.images.length > 1 && (
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                      {publication.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                            selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                          }`}
                        >
                          <img 
                            src={image} 
                            alt={`${publication.title} ${index + 1}`}
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
                  <h1 className="text-2xl font-bold text-gray-900 flex-1 mr-4">{publication.title}</h1>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">
                      ${publication.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Meta Information */}
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    <span>Publicado el {formatDate(publication.datePosted)}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    <span>{publication.location}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Eye size={16} className="mr-1" />
                    <span>247 vistas</span>
                  </div>

                  <div className="flex items-center">
                    <Tag size={16} className="mr-1" />
                    <span>{publication.condition}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <Button
                    leftIcon={<MessageSquare size={16} />}
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
                  <p className="text-gray-700 leading-relaxed">
                    {publication.description}
                  </p>
                </div>

                {/* Location Map - Solo para trabajos presenciales */}
                {publication.modality === 'presencial' ? (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Ubicación</h2>
                    <PresentialWorkInfo 
                      location={publication.location} 
                      variant="detailed" 
                      className="mb-4"
                    />
                    <PublicationMapView
                      coordinates={publication.coordinates}
                      title={publication.title}
                      location={publication.location}
                      height="300px"
                      className="w-full"
                    />
                  </div>
                ) : (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Modalidad de Trabajo</h2>
                    <RemoteWorkInfo variant="detailed" />
                  </div>
                )}

                {/* Product Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-3">Detalles del producto</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Categoría:</span>
                      <span className="ml-2 font-medium">{publication.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Condición:</span>
                      <span className="ml-2 font-medium">{publication.condition}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Modalidad:</span>
                      <span className="ml-2 font-medium">
                        <ModalityBadge modality={publication.modality} size="sm" />
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Ubicación:</span>
                      <span className="ml-2 font-medium">{publication.location}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Publicado:</span>
                      <span className="ml-2 font-medium">{formatDate(publication.datePosted)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 40% width (2/5) */}
          <div className="lg:col-span-2">
            {/* Seller Profile */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Información del Vendedor</h2>
              
              {/* Profile Header */}
              <div className="flex items-center mb-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-semibold">
                    {publication.seller.name.charAt(0)}
                  </div>
                  {/* Verification Badge */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Shield size={12} className="text-white" />
                  </div>
                </div>
                
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-gray-900">{publication.seller.name}</h3>
                  <p className="text-gray-600 text-sm">Vendedor verificado</p>
                  
                  {/* Rating */}
                  <div className="flex items-center mt-1">
                    {renderStars(publication.seller.rating)}
                    <span className="ml-2 text-sm text-gray-600">
                      {publication.seller.rating} (24 reseñas)
                    </span>
                  </div>
                </div>
              </div>

              {/* Seller Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-900">Miembro desde</div>
                  <div className="text-gray-600">Enero 2023</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-900">Tasa de respuesta</div>
                  <div className="text-green-600 font-medium">98%</div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin size={14} className="mr-2" />
                  <span>{publication.location}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock size={14} className="mr-2" />
                  <span>Responde en menos de 2 horas</span>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-2">
                <Button fullWidth leftIcon={<MessageSquare size={16} />}>
                  Enviar Mensaje
                </Button>
                <Button variant="outline" fullWidth leftIcon={<User size={16} />}>
                  Ver Perfil Completo
                </Button>
              </div>
            </div>

            {/* Other Listings from Seller */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Otros productos de este vendedor</h3>
              <div className="grid grid-cols-2 gap-3">
                {mockOtherListings.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="aspect-square rounded-lg overflow-hidden mb-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-green-600 font-semibold mt-1">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" fullWidth size="sm" className="mt-4">
                Ver todos los productos
              </Button>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Reseñas Recientes</h3>
              
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="pb-4 border-b border-gray-100 last:border-0">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                        {review.name.charAt(0)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            {review.name}
                          </span>
                          {renderStars(review.rating)}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-1">{review.comment}</p>
                        
                        <p className="text-xs text-gray-500">
                          {formatDate(review.date)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" fullWidth size="sm" className="mt-4">
                Ver todas las reseñas
              </Button>
            </div>

            {/* Report Button */}
            <div className="mt-6">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Flag size={16} />}
                className="text-gray-500 hover:text-gray-700"
              >
                Reportar esta publicación
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SamplePublicationDetail;