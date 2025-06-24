import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, PenTool as Tool, GraduationCap, Pencil, LineChart, Camera, Star, Users, BookOpen, ChevronRight } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  icon: React.ReactNode;
  stats: {
    courses: number;
    difficulty: string;
    students: number;
    rating: number;
  };
}

const categories: Category[] = [
  {
    id: 'web-dev',
    title: 'Desarrollo Web',
    description: 'Aprende a crear sitios web modernos y aplicaciones web interactivas con las últimas tecnologías.',
    imageUrl: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    icon: <Code2 className="w-6 h-6" />,
    stats: {
      courses: 156,
      difficulty: 'Intermedio',
      students: 12500,
      rating: 4.8
    }
  },
  {
    id: 'carpentry',
    title: 'Carpintería',
    description: 'Descubre el arte de trabajar la madera y crear hermosos muebles y estructuras artesanales.',
    imageUrl: 'https://images.pexels.com/photos/3637786/pexels-photo-3637786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    icon: <Tool className="w-6 h-6" />,
    stats: {
      courses: 89,
      difficulty: 'Todos los niveles',
      students: 5800,
      rating: 4.9
    }
  },
  {
    id: 'education',
    title: 'Educación',
    description: 'Metodologías de enseñanza modernas y recursos para educadores innovadores.',
    imageUrl: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    icon: <GraduationCap className="w-6 h-6" />,
    stats: {
      courses: 234,
      difficulty: 'Variado',
      students: 18900,
      rating: 4.7
    }
  },
  {
    id: 'graphic-design',
    title: 'Diseño Gráfico',
    description: 'Domina las herramientas de diseño digital y crea impactantes obras visuales.',
    imageUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    icon: <Pencil className="w-6 h-6" />,
    stats: {
      courses: 178,
      difficulty: 'Intermedio',
      students: 15600,
      rating: 4.8
    }
  },
  {
    id: 'digital-marketing',
    title: 'Marketing Digital',
    description: 'Estrategias efectivas para promocionar marcas y productos en el mundo digital.',
    imageUrl: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    icon: <LineChart className="w-6 h-6" />,
    stats: {
      courses: 145,
      difficulty: 'Intermedio',
      students: 21300,
      rating: 4.6
    }
  },
  {
    id: 'photography',
    title: 'Fotografía',
    description: 'Captura momentos únicos y aprende técnicas profesionales de fotografía.',
    imageUrl: 'https://images.pexels.com/photos/1787236/pexels-photo-1787236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    icon: <Camera className="w-6 h-6" />,
    stats: {
      courses: 112,
      difficulty: 'Todos los niveles',
      students: 9800,
      rating: 4.9
    }
  }
];

const CategoriesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explora Nuestras Categorías
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre una amplia variedad de categorías y encuentra el área perfecta para desarrollar tus habilidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/marketplace?category=${encodeURIComponent(category.title)}`}
              className="group bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.imageUrl}
                  alt={category.title}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content Container */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      {category.icon}
                    </div>
                    <h3 className="ml-3 text-xl font-semibold text-gray-900">
                      {category.title}
                    </h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>{category.stats.courses} cursos</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{category.stats.students.toLocaleString()} estudiantes</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Star className="w-4 h-4 mr-2 text-yellow-400" />
                    <span>{category.stats.rating} valoración</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    <span>{category.stats.difficulty}</span>
                  </div>
                </div>

                {/* Explore Button */}
                <div className="mt-6">
                  <button className="w-full bg-gray-50 text-blue-600 font-medium py-2 rounded-lg transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    Explorar Categoría
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;