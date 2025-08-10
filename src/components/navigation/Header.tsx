import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Search, Menu as MenuIcon, Bell, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import Button from '../ui/Button';
import Logo from '../ui/Logo';
import SearchModal from '../search/SearchModal';
import NotificationDropdown from '../notifications/NotificationDropdown';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const isHomepage = location.pathname === '/';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleSearchModal = () => setIsSearchModalOpen(!isSearchModalOpen);
  const toggleNotificationDropdown = () => setIsNotificationDropdownOpen(!isNotificationDropdownOpen);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-menu') && !target.closest('.profile-button')) {
        setIsProfileMenuOpen(false);
      }
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsMenuOpen(false);
      }
      if (!target.closest('.notification-dropdown') && !target.closest('.notification-button')) {
        setIsNotificationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + K to open search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchModalOpen(true);
      }
      // Escape to close modals
      if (event.key === 'Escape') {
        setIsSearchModalOpen(false);
        setIsNotificationDropdownOpen(false);
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  const navigationItems = [
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Concursos', href: '/contests' },
    { name: 'Categorías', href: '/categories' },
    { name: 'Nosotros', href: '/about' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          isHomepage
            ? isScrolled
              ? 'bg-black/40 backdrop-blur-lg shadow-2xl border-b border-white/20'
              : 'bg-black/30 backdrop-blur-md border-b border-white/10 shadow-lg'
            : isScrolled 
              ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
              : 'bg-white/80 backdrop-blur-sm'
        } ${
          isHomepage ? 'shadow-white/10' : ''
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link 
              to="/" 
              className={`flex items-center group transition-all duration-200 hover:scale-105 ${
                isHomepage ? 'drop-shadow-lg' : ''
              }`}
            >
              <Logo size="md" variant={isHomepage ? 'light' : 'default'} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-4 py-2 font-medium text-sm transition-all duration-200 rounded-lg group ${
                    isHomepage 
                      ? 'text-white hover:text-white/95 hover:bg-white/20 drop-shadow-lg' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  style={isHomepage ? {
                    textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)'
                  } : {}}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-3/4 transform -translate-x-1/2 ${
                    isHomepage 
                      ? 'bg-gradient-to-r from-white to-white/80' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-500'
                  }`}></span>
                </Link>
              ))}
            </nav>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center space-x-3">
              {user ? (
                <>
                  {/* Search Button */}
                  <button 
                    onClick={toggleSearchModal}
                    className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 group ${
                      isHomepage 
                        ? 'text-white hover:text-white hover:bg-white/20 drop-shadow-lg' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                    style={isHomepage ? {
                      textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    } : {}}
                    title="Buscar (Ctrl+K)"
                  >
                    <Search size={20} />
                    <span className={`hidden xl:block text-sm ${
                      isHomepage ? 'text-white/60' : 'text-gray-400'
                    }`}>Ctrl+K</span>
                  </button>

                  {/* Notifications */}
                  <div className="relative">
                    <button 
                      onClick={toggleNotificationDropdown}
                      className={`notification-button relative p-2 rounded-lg transition-all duration-200 ${
                        isHomepage 
                          ? 'text-white hover:text-white hover:bg-white/20 drop-shadow-lg' 
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      }`}
                      style={isHomepage ? {
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                      } : {}}
                      title="Notificaciones"
                    >
                      <Bell size={20} />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium animate-pulse">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      )}
                    </button>

                    <div className="notification-dropdown">
                      <NotificationDropdown 
                        isOpen={isNotificationDropdownOpen}
                        onClose={() => setIsNotificationDropdownOpen(false)}
                      />
                    </div>
                  </div>

                  {/* Profile Menu */}
                  <div className="relative">
                    <button 
                      onClick={toggleProfileMenu}
                      className={`profile-button flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        isHomepage 
                          ? 'text-white hover:bg-white/20 drop-shadow-lg' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      style={isHomepage ? {
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                      } : {}}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold shadow-md">
                        {user.email?.charAt(0).toUpperCase()}
                      </div>
                      <span className={`text-sm font-medium hidden xl:block ${
                        isHomepage ? 'drop-shadow-lg' : ''
                      }`}>Mi Cuenta</span>
                    </button>

                    {/* Profile Dropdown */}
                    {isProfileMenuOpen && (
                      <div className="profile-menu absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 transform transition-all duration-200 origin-top-right">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.email}
                          </p>
                          <p className="text-xs text-gray-500">Cuenta Personal</p>
                        </div>
                        
                        <div className="py-1">
                          <Link 
                            to="/dashboard"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsProfileMenuOpen(false)}
                          >
                            <User size={16} className="mr-3 text-gray-400" />
                            Dashboard
                          </Link>
                          <Link 
                            to="/dashboard/profile"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsProfileMenuOpen(false)}
                          >
                            <Settings size={16} className="mr-3 text-gray-400" />
                            Mi Perfil
                          </Link>
                        </div>
                        
                        <div className="border-t border-gray-100 py-1">
                          <button
                            onClick={handleSignOut}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut size={16} className="mr-3" />
                            Cerrar Sesión
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  {/* Search for non-authenticated users */}
                  <button 
                    onClick={toggleSearchModal}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      isHomepage 
                        ? 'text-white hover:text-white hover:bg-white/20 drop-shadow-lg' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                    style={isHomepage ? {
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                    } : {}}
                    title="Buscar"
                  >
                    <Search size={20} />
                  </button>
                  
                  <Link to="/login">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={isHomepage 
                        ? 'text-white hover:text-white hover:bg-white/20 drop-shadow-lg border-white/40 hover:border-white/60' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                      }
                      style={isHomepage ? {
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                      } : {}}
                    >
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button 
                      size="sm"
                      className={isHomepage 
                        ? 'bg-white/30 hover:bg-white/40 text-white border border-white/50 hover:border-white/70 backdrop-blur-sm drop-shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200'
                      }
                      style={isHomepage ? {
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                      } : {}}
                    >
                      Registrarse
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button 
              className={`mobile-menu-button lg:hidden p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isHomepage 
                  ? 'text-white hover:bg-white/20 drop-shadow-lg' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              style={isHomepage ? {
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
              } : {}}
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className={`mobile-menu lg:hidden absolute top-full left-0 right-0 backdrop-blur-lg border-b shadow-lg ${
            isHomepage 
              ? 'bg-black/40 border-white/20' 
              : 'bg-white/95 border-gray-100'
          }`}>
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-1">
                {/* Search in mobile menu */}
                <button
                  onClick={() => {
                    toggleSearchModal();
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                    isHomepage 
                      ? 'text-white hover:text-white hover:bg-white/20' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  style={isHomepage ? {
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  } : {}}
                >
                  <Search size={18} className="mr-3" />
                  Buscar
                </button>

                {navigationItems.map((item) => (
                  <Link 
                    key={item.name}
                    to={item.href} 
                    className={`block px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                      isHomepage 
                        ? 'text-white hover:text-white hover:bg-white/20' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    style={isHomepage ? {
                      textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    } : {}}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {user ? (
                  <div className="pt-4 border-t border-gray-100 space-y-1">
                    {/* Notifications in mobile */}
                    <button
                      onClick={() => {
                        toggleNotificationDropdown();
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                        isHomepage 
                          ? 'text-white hover:text-white hover:bg-white/20' 
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      style={isHomepage ? {
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                      } : {}}
                    >
                      <Bell size={18} className="mr-3" />
                      Notificaciones
                      {unreadCount > 0 && (
                        <span className="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      )}
                    </button>

                    <Link 
                      to="/dashboard" 
                      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                        isHomepage 
                          ? 'text-white hover:text-white hover:bg-white/20' 
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      style={isHomepage ? {
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                      } : {}}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={18} className="mr-3" />
                      Dashboard
                    </Link>
                    <Link 
                      to="/dashboard/profile" 
                      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                        isHomepage 
                          ? 'text-white hover:text-white hover:bg-white/20' 
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      style={isHomepage ? {
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                      } : {}}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings size={18} className="mr-3" />
                      Mi Perfil
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                        isHomepage 
                          ? 'text-red-400 hover:bg-red-500/20' 
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                      style={isHomepage ? {
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                      } : {}}
                    >
                      <LogOut size={18} className="mr-3" />
                      Cerrar Sesión
                    </button>
                  </div>
                ) : (
                  <div className={`pt-4 space-y-2 ${
                    isHomepage ? 'border-t border-white/20' : 'border-t border-gray-100'
                  }`}>
                    <Link 
                      to="/login" 
                      onClick={() => setIsMenuOpen(false)}
                      className="block"
                    >
                      <Button 
                        variant="ghost" 
                        fullWidth
                        className={`justify-start ${
                          isHomepage 
                            ? 'text-white hover:text-white hover:bg-white/20' 
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                        style={isHomepage ? {
                          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                        } : {}}
                      >
                        Iniciar Sesión
                      </Button>
                    </Link>
                    <Link 
                      to="/register" 
                      onClick={() => setIsMenuOpen(false)}
                      className="block"
                    >
                      <Button 
                        fullWidth
                        className={isHomepage 
                          ? 'bg-white/30 hover:bg-white/40 text-white border border-white/50 hover:border-white/70 backdrop-blur-sm' 
                          : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white'
                        }
                        style={isHomepage ? {
                          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                        } : {}}
                      >
                        Registrarse
                      </Button>
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-16 lg:h-18"></div>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
};

export default Header;