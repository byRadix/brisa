import React, { useState } from 'react';
import { Bell, Check, CheckCheck, Trash2, Filter, Search, Settings } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const NotificationsPage: React.FC = () => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    clearAllNotifications 
  } = useNotifications();

  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredNotifications = notifications.filter(notification => {
    // Filter by read status
    if (filter === 'unread' && notification.read) return false;
    if (filter === 'read' && !notification.read) return false;
    
    // Filter by type
    if (typeFilter !== 'all' && notification.type !== typeFilter) return false;
    
    // Filter by search term
    if (searchTerm && !notification.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !notification.message.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getNotificationTypeLabel = (type: string) => {
    const labels = {
      message: 'Mensaje',
      listing_update: 'Actualización de anuncio',
      price_change: 'Cambio de precio',
      new_match: 'Nueva oportunidad',
      announcement: 'Anuncio'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const handleMarkAllAsRead = async () => {
    setIsLoading(true);
    try {
      await markAllAsRead();
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = async () => {
    if (confirm('¿Estás seguro de que quieres eliminar todas las notificaciones?')) {
      setIsLoading(true);
      try {
        await clearAllNotifications();
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Bell className="mr-3" size={28} />
            Notificaciones
            {unreadCount > 0 && (
              <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {unreadCount} sin leer
              </span>
            )}
          </h1>
          <p className="text-gray-600">Gestiona todas tus notificaciones</p>
        </div>
        <Link to="/dashboard/settings">
          <Button variant="outline" leftIcon={<Settings size={16} />}>
            Configurar
          </Button>
        </Link>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <Input
              placeholder="Buscar notificaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search size={18} />}
            />
          </div>

          {/* Status Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'unread' | 'read')}
            className="rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          >
            <option value="all">Todas</option>
            <option value="unread">Sin leer</option>
            <option value="read">Leídas</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          >
            <option value="all">Todos los tipos</option>
            <option value="message">Mensajes</option>
            <option value="listing_update">Actualizaciones</option>
            <option value="price_change">Cambios de precio</option>
            <option value="new_match">Nuevas oportunidades</option>
            <option value="announcement">Anuncios</option>
          </select>

          {/* Actions */}
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button
                onClick={handleMarkAllAsRead}
                disabled={isLoading}
                variant="outline"
                size="sm"
                leftIcon={<CheckCheck size={16} />}
              >
                Marcar todas como leídas
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                onClick={handleClearAll}
                disabled={isLoading}
                variant="outline"
                size="sm"
                leftIcon={<Trash2 size={16} />}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Eliminar todas
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow-sm">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center">
            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              {notifications.length === 0 
                ? 'No hay notificaciones' 
                : 'No se encontraron notificaciones'
              }
            </h3>
            <p className="text-gray-500">
              {notifications.length === 0 
                ? 'Te notificaremos cuando tengas nuevos mensajes o actualizaciones'
                : 'Intenta cambiar los filtros de búsqueda'
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  !notification.read ? 'bg-blue-50/30 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-medium ${
                        !notification.read ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {getNotificationTypeLabel(notification.type)}
                        </span>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">
                      {notification.message}
                    </p>
                    
                    <p className="text-sm text-gray-500">
                      {formatDate(notification.created_at)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <Button
                        onClick={() => markAsRead(notification.id)}
                        variant="ghost"
                        size="sm"
                        leftIcon={<Check size={16} />}
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        Marcar como leída
                      </Button>
                    )}
                    <Button
                      onClick={() => deleteNotification(notification.id)}
                      variant="ghost"
                      size="sm"
                      leftIcon={<Trash2 size={16} />}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      {notifications.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>
              Mostrando {filteredNotifications.length} de {notifications.length} notificaciones
            </span>
            <span>
              {unreadCount} sin leer
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;