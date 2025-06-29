import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Star, 
  Award, 
  Users, 
  CheckCircle, 
  MessageSquare, 
  Share2, 
  Calendar,
  Globe,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { SampleListing } from '../../data/sampleListings';
import Button from '../ui/Button';

interface SampleListingDetailProps {
  listing: SampleListing;
}

const SampleListingDetail: React.FC<SampleListingDetailProps> = ({ listing }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="relative h-96">
              <img 
                src={listing.images[selectedImageIndex]} 
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex space-x-2">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {listing.category}
                </span>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {listing.modality}
                </span>
              </div>
            </div>
            
            {listing.images.length > 1 && (
              <div className="p-4">
                <div className="flex space-x-2">
                  {listing.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
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

          {/* Service Details */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{listing.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{listing.deliveryTime}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>{listing.location}</span>
              </div>
              <div className="flex items-center">
                <Award size={16} className="mr-2" />
                <span>{listing.experienceLevel}</span>
              </div>
              <div className="flex items-center">
                <Globe size={16} className="mr-2" />
                <span>{listing.modality}</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Descripción del Servicio</h2>
              <div className="prose text-gray-700 max-w-none">
                {listing.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Key Benefits */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Beneficios Clave</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {listing.keyBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Tecnologías y Habilidades</h2>
              <div className="flex flex-wrap gap-2">
                {listing.keywords.map((keyword, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Etiquetas</h2>
              <div className="flex flex-wrap gap-2">
                {listing.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Pricing Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 sticky top-6">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                €{listing.price}
                <span className="text-lg text-gray-500 font-normal">
                  {listing.category === 'Desarrollo Web' ? '/hora' : '/proyecto'}
                </span>
              </div>
              {listing.priceRange && (
                <p className="text-sm text-gray-600">{listing.priceRange}</p>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Tiempo de entrega:</span>
                <span className="font-medium">{listing.deliveryTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Modalidad:</span>
                <span className="font-medium">{listing.modality}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Experiencia:</span>
                <span className="font-medium">{listing.experienceLevel}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button fullWidth leftIcon={<MessageSquare size={16} />}>
                Contactar Ahora
              </Button>
              <Button variant="outline" fullWidth leftIcon={<Share2 size={16} />}>
                Compartir Servicio
              </Button>
            </div>
          </div>

          {/* Provider Info */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Información del Proveedor</h3>
            
            <div className="flex items-center mb-4">
              <img 
                src={listing.author.avatar} 
                alt={listing.author.name}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{listing.author.name}</h4>
                <p className="text-gray-600 text-sm">@{listing.author.username}</p>
                <div className="flex items-center mt-1">
                  <div className="flex items-center mr-3">
                    <Star size={14} className="text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium">{listing.author.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={14} className="text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">{listing.author.reviewsCount} reseñas</span>
                  </div>
                </div>
              </div>
            </div>

            <Button variant="outline" fullWidth leftIcon={<ExternalLink size={16} />}>
              Ver Perfil Completo
            </Button>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>
            
            <div className="space-y-3 text-sm">
              {listing.contactInfo.split('\n').map((line, index) => {
                if (line.includes('Email:')) {
                  return (
                    <div key={index} className="flex items-center">
                      <Mail size={16} className="text-gray-400 mr-2" />
                      <span className="text-gray-700">{line.replace('Email: ', '')}</span>
                    </div>
                  );
                }
                if (line.includes('WhatsApp:') || line.includes('Teléfono:')) {
                  return (
                    <div key={index} className="flex items-center">
                      <Phone size={16} className="text-gray-400 mr-2" />
                      <span className="text-gray-700">{line.split(': ')[1]}</span>
                    </div>
                  );
                }
                if (line.includes('Horario:')) {
                  return (
                    <div key={index} className="flex items-center">
                      <Calendar size={16} className="text-gray-400 mr-2" />
                      <span className="text-gray-700">{line.replace('Horario: ', '').replace('Horario de contacto: ', '')}</span>
                    </div>
                  );
                }
                return (
                  <p key={index} className="text-gray-700">{line}</p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleListingDetail;