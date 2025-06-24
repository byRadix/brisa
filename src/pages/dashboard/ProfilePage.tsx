import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { User, MapPin, Link as LinkIcon, DollarSign, Tag, Image } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import toast from 'react-hot-toast';

interface ProfileFormData {
  full_name: string;
  username: string;
  bio: string;
  website: string;
  location: string;
  avatar_url: string;
  skills: string[];
  hourly_rate: number;
  category: string;
  availability: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: '',
    username: '',
    bio: '',
    website: '',
    location: '',
    avatar_url: '',
    skills: [],
    hourly_rate: 0,
    category: '',
    availability: ''
  });
  
  // For skills input
  const [skillInput, setSkillInput] = useState('');
  
  // Category options
  const categories = [
    'Diseño Gráfico',
    'Desarrollo Web',
    'Marketing Digital',
    'Redacción & Traducción',
    'Video & Animación',
    'Música & Audio',
    'Programación & Tecnología',
    'Negocios',
    'Estilo de Vida',
    'Fotografía',
    'Otro'
  ];
  
  // Availability options
  const availabilityOptions = [
    'Tiempo Completo',
    'Medio Tiempo',
    'Disponible Fines de Semana',
    'Disponible por Proyecto',
    'Actualmente No Disponible'
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            
          if (error) throw error;
          
          if (data) {
            setFormData({
              full_name: data.full_name || '',
              username: data.username || '',
              bio: data.bio || '',
              website: data.website || '',
              location: data.location || '',
              avatar_url: data.avatar_url || '',
              skills: data.skills || [],
              hourly_rate: data.hourly_rate || 0,
              category: data.category || '',
              availability: data.availability || ''
            });
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Error al cargar el perfil');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'hourly_rate' ? parseFloat(value) : value
    }));
  };
  
  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };
  
  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: formData.full_name,
            username: formData.username,
            bio: formData.bio,
            website: formData.website,
            location: formData.location,
            avatar_url: formData.avatar_url,
            skills: formData.skills,
            hourly_rate: formData.hourly_rate,
            category: formData.category,
            availability: formData.availability,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);
          
        if (error) throw error;
        
        toast.success('Perfil actualizado correctamente');
      }
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Error al actualizar el perfil');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Mi Perfil</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-800 border-b pb-2">Información Básica</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nombre Completo"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                leftIcon={<User size={18} />}
                required
              />
              
              <Input
                label="Nombre de Usuario"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="username"
                helperText="Será usado en tu URL de perfil"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Biografía
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                placeholder="Cuéntanos sobre ti, tu experiencia y habilidades..."
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Sitio Web"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://tuwebsite.com"
                leftIcon={<LinkIcon size={18} />}
              />
              
              <Input
                label="Ubicación"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Ciudad, País"
                leftIcon={<MapPin size={18} />}
              />
            </div>
            
            <Input
              label="URL de Avatar"
              name="avatar_url"
              value={formData.avatar_url}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
              leftIcon={<Image size={18} />}
            />
          </div>
          
          {/* Professional Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-800 border-b pb-2">Información Profesional</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Habilidades
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {skill}
                    <button 
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <Input
                  placeholder="Añadir habilidad (ej. Photoshop, React, SEO)"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  containerClassName="flex-grow"
                />
                <Button 
                  type="button"
                  onClick={handleAddSkill}
                  className="ml-2"
                  variant="secondary"
                >
                  Añadir
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría Principal
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <Input
                label="Tarifa por Hora (USD)"
                name="hourly_rate"
                type="number"
                value={formData.hourly_rate.toString()}
                onChange={handleChange}
                placeholder="0"
                leftIcon={<DollarSign size={18} />}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Disponibilidad
              </label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
              >
                <option value="">Selecciona tu disponibilidad</option>
                {availabilityOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit"
              isLoading={isSaving}
            >
              Guardar Cambios
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;