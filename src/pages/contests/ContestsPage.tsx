import React from 'react';
import { Trophy, Clock, Users, Gift, ChevronRight, Calendar, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

interface Contest {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prize: {
    amount: number;
    currency: string;
    description: string;
  };
  endDate: string;
  participants: number;
  category: string;
  status: 'active' | 'upcoming' | 'ended';
}

const contests: Contest[] = [
  {
    id: 'summer-design-2025',
    title: 'Diseño de Verano 2025',
    description: 'Crea el diseño más innovador para nuestra colección de verano. Los mejores diseños serán producidos y comercializados.',
    imageUrl: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg',
    prize: {
      amount: 5000,
      currency: 'EUR',
      description: 'Primer premio + Regalías por ventas'
    },
    endDate: '2025-07-31',
    participants: 234,
    category: 'Diseño',
    status: 'active'
  },
  {
    id: 'eco-innovation',
    title: 'Innovación Sostenible',
    description: 'Desarrolla una solución innovadora para reducir el impacto ambiental en la industria manufacturera.',
    imageUrl: 'https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg',
    prize: {
      amount: 10000,
      currency: 'EUR',
      description: 'Premio principal + Mentoría empresarial'
    },
    endDate: '2025-08-15',
    participants: 156,
    category: 'Innovación',
    status: 'active'
  },
  {
    id: 'tech-challenge',
    title: 'Reto Tecnológico 2025',
    description: 'Crea una aplicación que resuelva un problema social utilizando inteligencia artificial.',
    imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    prize: {
      amount: 7500,
      currency: 'EUR',
      description: 'Premio en efectivo + Incubación'
    },
    endDate: '2025-06-30',
    participants: 312,
    category: 'Tecnología',
    status: 'active'
  },
  {
    id: 'marketing-masters',
    title: 'Marketing Masters',
    description: 'Desarrolla una estrategia de marketing digital innovadora para una marca líder.',
    imageUrl: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
    prize: {
      amount: 3000,
      currency: 'EUR',
      description: 'Premio + Contrato de trabajo'
    },
    endDate: '2025-09-01',
    participants: 178,
    category: 'Marketing',
    status: 'upcoming'
  }
];

const ContestsPage: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: Contest['status']) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      upcoming: 'bg-blue-100 text-blue-800',
      ended: 'bg-gray-100 text-gray-800'
    };

    const labels = {
      active: 'Activo',
      upcoming: 'Próximamente',
      ended: 'Finalizado'
    };

    return (
      <span className={`${styles[status]} px-3 py-1 rounded-full text-sm font-medium`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Concursos y Premios
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Participa en nuestros concursos, demuestra tu talento y gana premios increíbles mientras construyes tu portafolio profesional.
            </p>
            <Button 
              size="lg"
              leftIcon={<Trophy size={20} />}
            >
              Participar Ahora
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-blue-600 mb-2">
              <Trophy className="w-8 h-8" />
            </div>
            <div className="text-2xl font-bold text-gray-900">€25,500</div>
            <div className="text-gray-600">En Premios Activos</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-blue-600 mb-2">
              <Users className="w-8 h-8" />
            </div>
            <div className="text-2xl font-bold text-gray-900">880+</div>
            <div className="text-gray-600">Participantes</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-blue-600 mb-2">
              <Target className="w-8 h-8" />
            </div>
            <div className="text-2xl font-bold text-gray-900">4</div>
            <div className="text-gray-600">Concursos Activos</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-blue-600 mb-2">
              <Gift className="w-8 h-8" />
            </div>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-gray-600">Ganadores Mensuales</div>
          </div>
        </div>

        {/* Contests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contests.map((contest) => (
            <Link
              key={contest.id}
              to={`/contests/${contest.id}`}
              className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-48">
                <img
                  src={contest.imageUrl}
                  alt={contest.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  {getStatusBadge(contest.status)}
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                    {contest.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{contest.title}</h2>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2">
                  {contest.description}
                </p>

                <div className="border-t border-gray-100 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Gift className="w-4 h-4 mr-2" />
                        <span className="text-sm">Premio</span>
                      </div>
                      <div className="font-semibold text-gray-900">
                        {contest.prize.amount.toLocaleString()} {contest.prize.currency}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm">Participantes</span>
                      </div>
                      <div className="font-semibold text-gray-900">
                        {contest.participants}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">Fecha límite</span>
                      </div>
                      <div className="font-semibold text-gray-900">
                        {formatDate(contest.endDate)}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">Estado</span>
                      </div>
                      <div className="font-semibold text-gray-900 capitalize">
                        {contest.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContestsPage;