import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <Logo size="md" showText={true} />
            </Link>
            <p className="mt-4 text-gray-400">
              Conectando talento freelance con oportunidades de trabajo. Encuentra el freelancer perfecto para tu proyecto o muestra tus habilidades al mundo.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Explorar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/marketplace" className="text-gray-400 hover:text-white transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-gray-400 hover:text-white transition-colors">
                  Freelancers
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white transition-colors">
                  Categorías
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-400 hover:text-white transition-colors">
                  Búsqueda Avanzada
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Información</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  Acerca de Nosotros
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  Cómo Funciona
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                <a href="mailto:info@briisa.app" className="hover:text-white transition-colors">
                  info@briisa.app
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Suscríbete a nuestro newsletter</h4>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Tu email" 
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none w-full"
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg text-white font-medium transition-colors"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Briisa.app. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;