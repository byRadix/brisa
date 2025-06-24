import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Tag, Star, ChevronRight, DollarSign, MessageSquare } from 'lucide-react';
import Button from '../components/ui/Button';

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
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90"></div>
          <img
            src="https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Encuentra el talento que necesitas
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Conecta con profesionales especializados en llevar tus ideas al siguiente nivel
          </p>

          <div className="max-w-2xl mx-auto flex gap-4">
            <Link to="/marketplace" className="flex-1">
              <Button size="lg" fullWidth>
                Explorar
              </Button>
            </Link>
            <Link to="/login" className="flex-1">
              <Button 
                variant="outline" 
                size="lg"
                fullWidth
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-gray-900/50 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">¿Cómo funciona Briisa.app?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Una plataforma simple y efectiva para conectar freelancers con clientes de todo el mundo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg p-8 rounded-lg text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                  {index + 1}
                </div>
                <div className="bg-blue-500/10 text-blue-400 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-gray-800/30 to-gray-900/30 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Explora por Categoría</h2>
            <Link to="/categories" className="text-blue-400 hover:text-blue-300 flex items-center transition-colors">
              Ver todas
              <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/marketplace?category=${encodeURIComponent(category.name)}`}
                className="bg-white/5 hover:bg-white/10 backdrop-blur-lg p-6 rounded-lg transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center">
                  <span className="text-3xl mr-4">{category.icon}</span>
                  <div>
                    <h3 className="font-medium text-white">{category.name}</h3>
                    <p className="text-sm text-gray-400">{category.count} servicios</p>
                  </div>
                </div>
                <div className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-gray-900/50 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Ya sea que busques servicios profesionales o quieras ofrecer tus habilidades, Briisa.app es tu plataforma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg">
                Crear Cuenta
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white/10"
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