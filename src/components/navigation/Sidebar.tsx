import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  FileText, 
  Settings, 
  MessageSquare, 
  Star, 
  PlusCircle,
  BarChart 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Mi Perfil', path: '/dashboard/profile', icon: <User size={20} /> },
    { name: 'Mis Anuncios', path: '/dashboard/listings', icon: <FileText size={20} /> },
    { name: 'Crear Anuncio', path: '/dashboard/create-listing', icon: <PlusCircle size={20} /> },
    { name: 'Mensajes', path: '/dashboard/messages', icon: <MessageSquare size={20} /> },
    { name: 'Valoraciones', path: '/dashboard/reviews', icon: <Star size={20} /> },
    { name: 'Estadísticas', path: '/dashboard/stats', icon: <BarChart size={20} /> },
    { name: 'Configuración', path: '/dashboard/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="hidden md:block w-64 bg-white shadow-md p-5 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`
                  flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors
                  ${isActive(item.path) ? 'bg-blue-50 text-blue-600 font-medium' : ''}
                `}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;