import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-800">Página no encontrada</h2>
        <p className="mt-2 text-lg text-gray-600">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="mt-6">
          <Link to="/">
            <Button leftIcon={<Home size={18} />}>
              Volver al Inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;