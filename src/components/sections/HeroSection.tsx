import React from 'react';
import ImageCarousel from '../ui/ImageCarousel';

const HeroSection: React.FC = () => {
  // Mock data for carousel - replace with real data
  const carouselItems = [
    {
      id: '1',
      title: 'Diseño Web Profesional',
      description: 'Creamos sitios web modernos y responsivos que destacan tu marca en el mercado digital.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/marketplace?category=Desarrollo%20Web'
    },
    {
      id: '2',
      title: 'Marketing Digital Efectivo',
      description: 'Estrategias de marketing que impulsan tu negocio y aumentan tu presencia online.',
      image: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/marketplace?category=Marketing%20Digital'
    },
    {
      id: '3',
      title: 'Diseño Gráfico Creativo',
      description: 'Soluciones visuales que comunican tu mensaje de manera impactante y memorable.',
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/marketplace?category=Diseño%20Gráfico'
    },
    {
      id: '4',
      title: 'Desarrollo de Aplicaciones',
      description: 'Apps móviles y web que transforman ideas en soluciones tecnológicas innovadoras.',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/marketplace?category=Programación%20&%20Tecnología'
    },
    {
      id: '5',
      title: 'Fotografía Profesional',
      description: 'Capturamos momentos únicos con calidad profesional para tu marca o evento.',
      image: 'https://images.pexels.com/photos/1787236/pexels-photo-1787236.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/marketplace?category=Fotografía'
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
          {/* Featured Image - Left Side (60% width) */}
          <div className="lg:col-span-7">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/image.png"
                  alt="Plataforma Briisa.app - Conectando talento freelance"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              
              {/* Floating elements for visual interest */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-green-500 to-blue-500 rounded-full opacity-15 blur-2xl"></div>
            </div>
          </div>

          {/* Carousel - Right Side */}
          <div className="lg:col-span-5">
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  Servicios Destacados
                </h2>
                <p className="text-gray-600 text-lg">
                  Descubre los mejores profesionales en cada categoría
                </p>
              </div>
              
              <ImageCarousel 
                items={carouselItems}
                autoPlay={true}
                interval={5000}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          {/* Featured Image - Top */}
          <div className="w-full">
            <div className="relative max-w-lg mx-auto">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/image.png"
                  alt="Plataforma Briisa.app - Conectando talento freelance"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              
              {/* Mobile floating elements */}
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-20 blur-lg"></div>
              <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full opacity-15 blur-xl"></div>
            </div>
          </div>

          {/* Carousel - Bottom */}
          <div className="w-full">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Servicios Destacados
              </h2>
              <p className="text-gray-600">
                Descubre los mejores profesionales en cada categoría
              </p>
            </div>
            
            <ImageCarousel 
              items={carouselItems}
              autoPlay={true}
              interval={5000}
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="/marketplace"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Explorar Servicios
            </a>
            <a
              href="/register"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Únete como Freelancer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;