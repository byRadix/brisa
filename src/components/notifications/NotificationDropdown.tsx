import React, { useState } from 'react';
import { Bell, X, Check, CheckCheck, Trash2, Settings, MessageSquare, TrendingUp, DollarSign, Megaphone } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { Link } from 'react-router-dom';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    clearAllNotifications 
  } = useNotifications();

  const [isLoading, setIsLoading] = useState(false);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Ahora mismo';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)}h`;
    if (diffInMinutes < 10080) return `Hace ${Math.floor(diffInMinutes / 1440)}d`;
    return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare size={16} className="text-blue-500" />;
      case 'listing_update':
        return <TrendingUp size={16} className="text-green-500" />;
      case 'price_change':
        return <DollarSign size={16} className="text-orange-500" />;
      case 'new_match':
        return <Bell size={16} className="text-purple-500" />;
      case 'announcement':
        return <Megaphone size={16} className="text-red-500" />;
      default:
        return <Bell size={16} className="text-gray-400" />;
    }
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

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-100 z-50 max-h-[32rem] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold text-gray-900">Notificaciones</h3>
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              disabled={isLoading}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              title="Marcar todas como leídas"
            >
              <CheckCheck size={16} />
            </button>
          )}
          <Link
            to="/dashboard/settings"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Configurar notificaciones"
          >
            <Settings size={16} />
          </Link>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <Bell size={48} className="text-gray-300 mb-4" />
            <h4 className="text-lg font-medium text-gray-700 mb-2">
              No hay notificaciones
            </h4>
            <p className="text-gray-500 text-center">
              Te notificaremos cuando tengas nuevos mensajes o actualizaciones
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  !notification.read ? 'bg-blue-50/50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`text-sm font-medium ${
                          !notification.read ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {formatTimeAgo(notification.created_at)}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-1 ml-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                            title="Marcar como leída"
                          >
                            <Check size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title="Eliminar notificación"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    
                    {!notification.read && (
                      <div className="absolute left-2 top-1/2 w-2 h-2 bg-blue-500 rounded-full transform -translate-y-1/2"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="border-t border-gray-100 p-3">
          <div className="flex justify-between items-center">
            <button
              onClick={handleClearAll}
              disabled={isLoading}
              className="text-sm text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
            >
              Eliminar todas
            </button>
            <Link
              to="/dashboard/notifications"
              onClick={onClose}
              className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              Ver todas las notificaciones
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;