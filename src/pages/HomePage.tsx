import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Tag, Star, ChevronRight, DollarSign, MessageSquare } from 'lucide-react';
import Button from '../components/ui/Button';
import HeroSection from '../components/sections/HeroSection';

const HomePage: React.FC = () => {
  const categories = [
    { name: 'Diseño Gráfico', icon: '🎨', count: 245 },
    { name: 'Desarrollo Web', icon: '💻', count: 312 },
    { name: 'Marketing Digital', icon: '📊', count: 186 },
    { name: 'Redacción & Traducción', icon: '✏️', count: 173 },
    { name: 'Video & Animación', icon: '🎬', count: 129 },
    { name: 'Música & Audio', icon: '🎵', count: 98 },
  ];

  const steps = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Publica tu anuncio",
      description: "Describe el servicio que necesitas y publícalo gratuitamente en nuestra plataforma."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Recibe y elige profesionales",
      description: "Los mejores profesionales te contactarán directamente. Compara sus perfiles, trabajos anteriores y valoraciones para elegir el que mejor se adapte a tus necesidades."
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Realiza un pago seguro",
      description: "Utiliza nuestro sistema de pago seguro integrado en la plataforma para garantizar la calidad y protección de tu inversión."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Valora el servicio",
      description: "Comparte tu experiencia y califica al profesional después de completado el trabajo. Ayuda a otros usuarios a tomar mejores decisiones."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section with Featured Image and Carousel */}
      <HeroSection />

      {/* How it Works Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Cómo funciona Briisa.app?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Una plataforma simple y efectiva para conectar freelancers con clientes de todo el mundo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                  {index + 1}
                </div>
                <div className="bg-blue-50 text-blue-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 mt-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 text-center">{step.title}</h3>
                <p className="text-gray-600 text-center">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Explora por Categoría</h2>
            <Link to="/categories" className="text-blue-600 hover:text-blue-700 flex items-center transition-colors">
              Ver todas
              <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/marketplace?category=${encodeURIComponent(category.name)}`}
                className="bg-gray-50 hover:bg-gray-100 p-6 rounded-lg transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center">
                  <span className="text-3xl mr-4">{category.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} servicios</p>
                  </div>
                </div>
                <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Ya sea que busques servicios profesionales o quieras ofrecer tus habilidades, Briisa.app es tu plataforma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Crear Cuenta
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Explorar Servicios
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;