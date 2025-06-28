import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabaseClient';

export interface Notification {
  id: string;
  type: 'message' | 'listing_update' | 'price_change' | 'new_match' | 'announcement';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  data?: any;
  user_id: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  clearAllNotifications: () => Promise<void>;
  addNotification: (notification: Omit<Notification, 'id' | 'created_at' | 'user_id'>) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock notifications for demonstration
  useEffect(() => {
    if (user) {
      // Generate mock notifications
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'message',
          title: 'Nuevo mensaje',
          message: 'María García te ha enviado un mensaje sobre tu servicio de diseño.',
          read: false,
          created_at: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
          user_id: user.id
        },
        {
          id: '2',
          type: 'new_match',
          title: 'Nueva oportunidad',
          message: 'Hay un nuevo proyecto de "desarrollo web" que coincide con tus habilidades.',
          read: false,
          created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          user_id: user.id
        },
        {
          id: '3',
          type: 'listing_update',
          title: 'Anuncio actualizado',
          message: 'Tu anuncio "Diseño de logotipos" ha recibido 5 nuevas visualizaciones.',
          read: true,
          created_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
          user_id: user.id
        },
        {
          id: '4',
          type: 'announcement',
          title: 'Nuevas funciones',
          message: 'Hemos añadido nuevas herramientas de comunicación para mejorar tu experiencia.',
          read: false,
          created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          user_id: user.id
        },
        {
          id: '5',
          type: 'price_change',
          title: 'Cambio de precio',
          message: 'Un servicio que sigues ha reducido su precio en un 20%.',
          read: true,
          created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          user_id: user.id
        }
      ];

      setNotifications(mockNotifications);
    } else {
      setNotifications([]);
    }
  }, [user]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = async (id: string) => {
    try {
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, read: true }
            : notification
        )
      );
      
      // In a real app, update the database
      // await supabase
      //   .from('notifications')
      //   .update({ read: true })
      //   .eq('id', id);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      
      // In a real app, update the database
      // await supabase
      //   .from('notifications')
      //   .update({ read: true })
      //   .eq('user_id', user?.id);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      setNotifications(prev => prev.filter(n => n.id !== id));
      
      // In a real app, delete from database
      // await supabase
      //   .from('notifications')
      //   .delete()
      //   .eq('id', id);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const clearAllNotifications = async () => {
    try {
      setNotifications([]);
      
      // In a real app, delete from database
      // await supabase
      //   .from('notifications')
      //   .delete()
      //   .eq('user_id', user?.id);
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  const addNotification = async (notification: Omit<Notification, 'id' | 'created_at' | 'user_id'>) => {
    if (!user) return;

    try {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        user_id: user.id
      };

      setNotifications(prev => [newNotification, ...prev]);
      
      // In a real app, save to database
      // await supabase
      //   .from('notifications')
      //   .insert(newNotification);
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      isLoading,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      clearAllNotifications,
      addNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};