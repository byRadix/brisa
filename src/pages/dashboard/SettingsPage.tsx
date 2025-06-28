import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Globe, 
  Shield, 
  Eye, 
  Moon, 
  Sun, 
  Smartphone, 
  Clock, 
  Key, 
  Monitor,
  Save,
  RotateCcw,
  Plus,
  X,
  Check,
  AlertTriangle,
  Settings as SettingsIcon
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import toast from 'react-hot-toast';

interface NotificationSettings {
  keywords: string[];
  emailNotifications: boolean;
  pushNotifications: boolean;
  inAppNotifications: boolean;
  frequency: 'realtime' | 'daily' | 'weekly';
  newMessages: boolean;
  newReviews: boolean;
  listingViews: boolean;
  marketingEmails: boolean;
}

interface GeneralSettings {
  language: string;
  timezone: string;
  theme: 'light' | 'dark' | 'system';
  profileVisibility: 'public' | 'private' | 'contacts';
  showEmail: boolean;
  showPhone: boolean;
  contentFilter: 'all' | 'moderate' | 'strict';
}

interface SecuritySettings {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
  loginAlerts: boolean;
}

interface ConnectedDevice {
  id: string;
  name: string;
  type: string;
  lastActive: string;
  location: string;
  current: boolean;
}

interface LoginHistory {
  id: string;
  timestamp: string;
  location: string;
  device: string;
  ipAddress: string;
  success: boolean;
}

const SettingsPage: React.FC = () => {
  const { user, updatePassword } = useAuth();
  const [activeTab, setActiveTab] = useState('notifications');
  const [isLoading, setIsLoading] = useState(false);
  const [keywordInput, setKeywordInput] = useState('');

  // Settings states
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    keywords: ['diseño', 'desarrollo', 'marketing'],
    emailNotifications: true,
    pushNotifications: true,
    inAppNotifications: true,
    frequency: 'realtime',
    newMessages: true,
    newReviews: true,
    listingViews: false,
    marketingEmails: false
  });

  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    language: 'es',
    timezone: 'Europe/Madrid',
    theme: 'light',
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    contentFilter: 'moderate'
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    loginAlerts: true
  });

  // Mock data for devices and login history
  const [connectedDevices] = useState<ConnectedDevice[]>([
    {
      id: '1',
      name: 'MacBook Pro',
      type: 'desktop',
      lastActive: '2025-01-01T10:30:00Z',
      location: 'Madrid, España',
      current: true
    },
    {
      id: '2',
      name: 'iPhone 14',
      type: 'mobile',
      lastActive: '2025-01-01T09:15:00Z',
      location: 'Madrid, España',
      current: false
    }
  ]);

  const [loginHistory] = useState<LoginHistory[]>([
    {
      id: '1',
      timestamp: '2025-01-01T10:30:00Z',
      location: 'Madrid, España',
      device: 'MacBook Pro',
      ipAddress: '192.168.1.1',
      success: true
    },
    {
      id: '2',
      timestamp: '2025-01-01T09:15:00Z',
      location: 'Madrid, España',
      device: 'iPhone 14',
      ipAddress: '192.168.1.2',
      success: true
    }
  ]);

  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' }
  ];

  const timezones = [
    'Europe/Madrid',
    'Europe/London',
    'America/New_York',
    'America/Los_Angeles',
    'Asia/Tokyo',
    'Australia/Sydney'
  ];

  const tabs = [
    { id: 'notifications', label: 'Notificaciones', icon: <Bell size={20} /> },
    { id: 'general', label: 'General', icon: <Globe size={20} /> },
    { id: 'security', label: 'Seguridad', icon: <Shield size={20} /> },
    { id: 'privacy', label: 'Privacidad', icon: <Eye size={20} /> }
  ];

  useEffect(() => {
    loadUserSettings();
  }, [user]);

  const loadUserSettings = async () => {
    if (!user) return;
    
    try {
      // In a real app, load settings from database
      // For now, we'll use localStorage for persistence
      const savedNotifications = localStorage.getItem('notificationSettings');
      const savedGeneral = localStorage.getItem('generalSettings');
      
      if (savedNotifications) {
        setNotificationSettings(JSON.parse(savedNotifications));
      }
      
      if (savedGeneral) {
        setGeneralSettings(JSON.parse(savedGeneral));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveNotificationSettings = async () => {
    setIsLoading(true);
    try {
      // Save to localStorage (in real app, save to database)
      localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
      toast.success('Configuración de notificaciones guardada');
    } catch (error) {
      toast.error('Error al guardar la configuración');
    } finally {
      setIsLoading(false);
    }
  };

  const saveGeneralSettings = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem('generalSettings', JSON.stringify(generalSettings));
      
      // Apply theme change immediately
      if (generalSettings.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      toast.success('Configuración general guardada');
    } catch (error) {
      toast.error('Error al guardar la configuración');
    } finally {
      setIsLoading(false);
    }
  };

  const saveSecuritySettings = async () => {
    if (securitySettings.newPassword) {
      if (securitySettings.newPassword !== securitySettings.confirmPassword) {
        toast.error('Las contraseñas no coinciden');
        return;
      }
      
      if (securitySettings.newPassword.length < 6) {
        toast.error('La contraseña debe tener al menos 6 caracteres');
        return;
      }
    }

    setIsLoading(true);
    try {
      if (securitySettings.newPassword) {
        await updatePassword(securitySettings.newPassword);
        setSecuritySettings(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      }
      
      toast.success('Configuración de seguridad actualizada');
    } catch (error: any) {
      toast.error(error.message || 'Error al actualizar la configuración');
    } finally {
      setIsLoading(false);
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !notificationSettings.keywords.includes(keywordInput.trim())) {
      setNotificationSettings(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const resetToDefaults = () => {
    if (confirm('¿Estás seguro de que quieres restaurar la configuración predeterminada?')) {
      localStorage.removeItem('notificationSettings');
      localStorage.removeItem('generalSettings');
      
      setNotificationSettings({
        keywords: [],
        emailNotifications: true,
        pushNotifications: true,
        inAppNotifications: true,
        frequency: 'realtime',
        newMessages: true,
        newReviews: true,
        listingViews: false,
        marketingEmails: false
      });
      
      setGeneralSettings({
        language: 'es',
        timezone: 'Europe/Madrid',
        theme: 'light',
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false,
        contentFilter: 'moderate'
      });
      
      toast.success('Configuración restaurada a valores predeterminados');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES');
  };

  const ToggleSwitch = ({ 
    checked, 
    onChange, 
    label 
  }: { 
    checked: boolean; 
    onChange: (checked: boolean) => void; 
    label: string;
  }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-gray-700">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Configuración</h1>
          <p className="text-gray-600">Personaliza tu experiencia en Briisa.app</p>
        </div>
        <Button
          onClick={resetToDefaults}
          variant="outline"
          leftIcon={<RotateCcw size={16} />}
        >
          Restaurar Predeterminados
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Configuración de Notificaciones</h2>
                <Button
                  onClick={saveNotificationSettings}
                  isLoading={isLoading}
                  leftIcon={<Save size={16} />}
                >
                  Guardar Cambios
                </Button>
              </div>

              <div className="space-y-8">
                {/* Keywords Section */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Palabras Clave</h3>
                  <p className="text-gray-600 mb-4">
                    Recibe notificaciones cuando aparezcan anuncios con estas palabras clave
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {notificationSettings.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {keyword}
                        <button
                          onClick={() => removeKeyword(keyword)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="Agregar palabra clave"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addKeyword();
                        }
                      }}
                      containerClassName="flex-grow"
                    />
                    <Button
                      onClick={addKeyword}
                      variant="outline"
                      leftIcon={<Plus size={16} />}
                    >
                      Agregar
                    </Button>
                  </div>
                </div>

                {/* Notification Types */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Tipos de Notificaciones</h3>
                  <div className="space-y-4">
                    <ToggleSwitch
                      checked={notificationSettings.emailNotifications}
                      onChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))}
                      label="Notificaciones por Email"
                    />
                    <ToggleSwitch
                      checked={notificationSettings.pushNotifications}
                      onChange={(checked) => setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))}
                      label="Notificaciones Push"
                    />
                    <ToggleSwitch
                      checked={notificationSettings.inAppNotifications}
                      onChange={(checked) => setNotificationSettings(prev => ({ ...prev, inAppNotifications: checked }))}
                      label="Notificaciones en la App"
                    />
                  </div>
                </div>

                {/* Frequency */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Frecuencia</h3>
                  <select
                    value={notificationSettings.frequency}
                    onChange={(e) => setNotificationSettings(prev => ({ 
                      ...prev, 
                      frequency: e.target.value as 'realtime' | 'daily' | 'weekly' 
                    }))}
                    className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  >
                    <option value="realtime">Tiempo Real</option>
                    <option value="daily">Resumen Diario</option>
                    <option value="weekly">Resumen Semanal</option>
                  </select>
                </div>

                {/* Specific Notifications */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Notificaciones Específicas</h3>
                  <div className="space-y-4">
                    <ToggleSwitch
                      checked={notificationSettings.newMessages}
                      onChange={(checked) => setNotificationSettings(prev => ({ ...prev, newMessages: checked }))}
                      label="Nuevos mensajes"
                    />
                    <ToggleSwitch
                      checked={notificationSettings.newReviews}
                      onChange={(checked) => setNotificationSettings(prev => ({ ...prev, newReviews: checked }))}
                      label="Nuevas valoraciones"
                    />
                    <ToggleSwitch
                      checked={notificationSettings.listingViews}
                      onChange={(checked) => setNotificationSettings(prev => ({ ...prev, listingViews: checked }))}
                      label="Vistas de anuncios"
                    />
                    <ToggleSwitch
                      checked={notificationSettings.marketingEmails}
                      onChange={(checked) => setNotificationSettings(prev => ({ ...prev, marketingEmails: checked }))}
                      label="Emails de marketing"
                    />
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Vista Previa</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <Bell className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Nuevo anuncio encontrado</h4>
                        <p className="text-sm text-gray-600">
                          Se encontró un anuncio de "diseño" que coincide con tus palabras clave
                        </p>
                        <p className="text-xs text-gray-500">Hace 2 minutos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Configuración General</h2>
                <Button
                  onClick={saveGeneralSettings}
                  isLoading={isLoading}
                  leftIcon={<Save size={16} />}
                >
                  Guardar Cambios
                </Button>
              </div>

              <div className="space-y-8">
                {/* Language and Region */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Idioma
                    </label>
                    <select
                      value={generalSettings.language}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zona Horaria
                    </label>
                    <select
                      value={generalSettings.timezone}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    >
                      {timezones.map((tz) => (
                        <option key={tz} value={tz}>{tz}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Theme */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Apariencia</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'light', label: 'Claro', icon: <Sun size={20} /> },
                      { value: 'dark', label: 'Oscuro', icon: <Moon size={20} /> },
                      { value: 'system', label: 'Sistema', icon: <Monitor size={20} /> }
                    ].map((theme) => (
                      <button
                        key={theme.value}
                        onClick={() => setGeneralSettings(prev => ({ ...prev, theme: theme.value as any }))}
                        className={`p-4 rounded-lg border-2 transition-colors ${
                          generalSettings.theme === theme.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          {theme.icon}
                          <span className="text-sm font-medium">{theme.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Preferences */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Preferencias de Contenido</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Filtro de Contenido
                    </label>
                    <select
                      value={generalSettings.contentFilter}
                      onChange={(e) => setGeneralSettings(prev => ({ 
                        ...prev, 
                        contentFilter: e.target.value as 'all' | 'moderate' | 'strict' 
                      }))}
                      className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    >
                      <option value="all">Mostrar todo el contenido</option>
                      <option value="moderate">Filtrado moderado</option>
                      <option value="strict">Filtrado estricto</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Configuración de Seguridad</h2>
                <Button
                  onClick={saveSecuritySettings}
                  isLoading={isLoading}
                  leftIcon={<Save size={16} />}
                >
                  Guardar Cambios
                </Button>
              </div>

              <div className="space-y-8">
                {/* Password Change */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Cambiar Contraseña</h3>
                  <div className="space-y-4">
                    <Input
                      label="Contraseña Actual"
                      type="password"
                      value={securitySettings.currentPassword}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                      leftIcon={<Key size={18} />}
                    />
                    <Input
                      label="Nueva Contraseña"
                      type="password"
                      value={securitySettings.newPassword}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, newPassword: e.target.value }))}
                      leftIcon={<Key size={18} />}
                      helperText="Mínimo 6 caracteres"
                    />
                    <Input
                      label="Confirmar Nueva Contraseña"
                      type="password"
                      value={securitySettings.confirmPassword}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      leftIcon={<Key size={18} />}
                    />
                  </div>
                </div>

                {/* Two Factor Authentication */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Autenticación de Dos Factores</h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                      <span className="text-yellow-800">
                        {securitySettings.twoFactorEnabled 
                          ? 'La autenticación de dos factores está activada' 
                          : 'Recomendamos activar la autenticación de dos factores para mayor seguridad'
                        }
                      </span>
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={securitySettings.twoFactorEnabled}
                    onChange={(checked) => setSecuritySettings(prev => ({ ...prev, twoFactorEnabled: checked }))}
                    label="Activar autenticación de dos factores"
                  />
                </div>

                {/* Login Alerts */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Alertas de Inicio de Sesión</h3>
                  <ToggleSwitch
                    checked={securitySettings.loginAlerts}
                    onChange={(checked) => setSecuritySettings(prev => ({ ...prev, loginAlerts: checked }))}
                    label="Recibir alertas de nuevos inicios de sesión"
                  />
                </div>

                {/* Connected Devices */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Dispositivos Conectados</h3>
                  <div className="space-y-3">
                    {connectedDevices.map((device) => (
                      <div key={device.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            {device.type === 'mobile' ? <Smartphone size={20} /> : <Monitor size={20} />}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">
                              {device.name}
                              {device.current && (
                                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                  Actual
                                </span>
                              )}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {device.location} • Última actividad: {formatDate(device.lastActive)}
                            </p>
                          </div>
                        </div>
                        {!device.current && (
                          <Button variant="outline" size="sm">
                            Desconectar
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Login History */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Historial de Inicio de Sesión</h3>
                  <div className="space-y-3">
                    {loginHistory.map((login) => (
                      <div key={login.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${login.success ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <div>
                            <p className="font-medium text-gray-800">
                              {login.device} • {login.location}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDate(login.timestamp)} • IP: {login.ipAddress}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {login.success ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <X className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Configuración de Privacidad</h2>
                <Button
                  onClick={saveGeneralSettings}
                  isLoading={isLoading}
                  leftIcon={<Save size={16} />}
                >
                  Guardar Cambios
                </Button>
              </div>

              <div className="space-y-8">
                {/* Profile Visibility */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Visibilidad del Perfil</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ¿Quién puede ver tu perfil?
                      </label>
                      <select
                        value={generalSettings.profileVisibility}
                        onChange={(e) => setGeneralSettings(prev => ({ 
                          ...prev, 
                          profileVisibility: e.target.value as 'public' | 'private' | 'contacts' 
                        }))}
                        className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                      >
                        <option value="public">Público (todos pueden ver)</option>
                        <option value="contacts">Solo contactos</option>
                        <option value="private">Privado (solo tú)</option>
                      </select>
                    </div>

                    <ToggleSwitch
                      checked={generalSettings.showEmail}
                      onChange={(checked) => setGeneralSettings(prev => ({ ...prev, showEmail: checked }))}
                      label="Mostrar email en el perfil público"
                    />

                    <ToggleSwitch
                      checked={generalSettings.showPhone}
                      onChange={(checked) => setGeneralSettings(prev => ({ ...prev, showPhone: checked }))}
                      label="Mostrar teléfono en el perfil público"
                    />
                  </div>
                </div>

                {/* Data Management */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Gestión de Datos</h3>
                  <div className="space-y-4">
                    <Button variant="outline" fullWidth>
                      Descargar mis datos
                    </Button>
                    <Button variant="outline" fullWidth>
                      Solicitar eliminación de cuenta
                    </Button>
                  </div>
                </div>

                {/* Privacy Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Información sobre Privacidad</h4>
                  <p className="text-blue-700 text-sm">
                    Respetamos tu privacidad y protegemos tus datos personales de acuerdo con nuestra 
                    <a href="/privacy" className="underline ml-1">Política de Privacidad</a>.
                    Puedes controlar qué información compartes y con quién.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;