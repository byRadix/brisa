import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { uploadListingImage, validateImage } from '../../lib/storage';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { DollarSign, Tag, Info, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';

interface FormData {
  title: string;
  description: string;
  category: string;
  price: number;
  price_type: string;
  location: string;
  contact_info: string;
  tags: string[];
  images: File[];
}

interface ImagePreview {
  file: File;
  preview: string;
}

const CreateListingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    price: 0,
    price_type: 'hora',
    location: '',
    contact_info: '',
    tags: [],
    images: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<ImagePreview[]>([]);
  
  // Categories
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
  
  // Price types
  const priceTypes = [
    'hora',
    'proyecto',
    'día',
    'semana',
    'mes'
  ];

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => {
      const error = validateImage(file);
      if (error) {
        toast.error(error);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...validFiles]
      }));

      const newPreviews = validFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setImagePreview(prev => [...prev, ...newPreviews]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles: 5
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreview[index].preview);
    setImagePreview(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    }
    if (!formData.category) {
      newErrors.category = 'Debes seleccionar una categoría';
    }
    if (formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor que cero';
    }
    if (!formData.contact_info.trim()) {
      newErrors.contact_info = 'La información de contacto es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (!user) {
      toast.error('Debes iniciar sesión para crear un anuncio');
      navigate('/login');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // First create the listing without images
      const listingData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        price: formData.price,
        price_type: formData.price_type,
        author_id: user.id,
        location: formData.location.trim() || null,
        contact_info: formData.contact_info.trim(),
        tags: formData.tags.length > 0 ? formData.tags : null,
        status: 'active',
        image_urls: []
      };

      const { data: listing, error: listingError } = await supabase
        .from('listings')
        .insert(listingData)
        .select()
        .single();

      if (listingError) {
        console.error('Error creating listing:', listingError);
        throw new Error(listingError.message || 'Error al crear el anuncio');
      }

      // Then upload images if any
      let imageUrls: string[] = [];
      if (formData.images.length > 0) {
        try {
          const uploadPromises = formData.images.map(file => 
            uploadListingImage(file, user.id, listing.id)
          );
          
          const uploadedImages = await Promise.all(uploadPromises);
          imageUrls = uploadedImages.map(img => img.url);

          // Update listing with image URLs
          const { error: updateError } = await supabase
            .from('listings')
            .update({ image_urls: imageUrls })
            .eq('id', listing.id);

          if (updateError) {
            console.error('Error updating listing with images:', updateError);
            // Don't throw here, the listing was created successfully
            toast.error('Anuncio creado pero hubo un problema con las imágenes');
          }
        } catch (imageError) {
          console.error('Error uploading images:', imageError);
          // Don't throw here, the listing was created successfully
          toast.error('Anuncio creado pero hubo un problema con las imágenes');
        }
      }

      toast.success('Anuncio creado correctamente');
      navigate(`/marketplace/${listing.id}`);
    } catch (error: any) {
      console.error('Error creating listing:', error);
      toast.error(error.message || 'Error al crear el anuncio');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Crear Nuevo Anuncio</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-800 border-b pb-2">Información Básica</h2>
            
            <Input
              label="Título del Anuncio"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              placeholder="Ej. Diseño de Logotipos Profesionales"
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className={`w-full rounded-lg border ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                } bg-white py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all`}
                placeholder="Describe detalladamente tu servicio, experiencia, lo que ofreces, tiempos de entrega, etc."
                required
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full rounded-lg border ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  } bg-white py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all`}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Precio *"
                  name="price"
                  type="number"
                  value={formData.price.toString()}
                  onChange={handleChange}
                  error={errors.price}
                  placeholder="0"
                  required
                  leftIcon={<DollarSign size={18} />}
                  min="0"
                  step="0.01"
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Por
                  </label>
                  <select
                    name="price_type"
                    value={formData.price_type}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                  >
                    {priceTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact and Location Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-800 border-b pb-2">Contacto y Ubicación</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Información de Contacto *
                </label>
                <textarea
                  name="contact_info"
                  value={formData.contact_info}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full rounded-lg border ${
                    errors.contact_info ? 'border-red-500' : 'border-gray-300'
                  } bg-white py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all`}
                  placeholder="Email, teléfono, WhatsApp, etc."
                  required
                />
                {errors.contact_info && (
                  <p className="mt-1 text-sm text-red-600">{errors.contact_info}</p>
                )}
              </div>

              <Input
                label="Ubicación"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Ej. Madrid, España"
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imágenes (Opcional)
            </label>
            
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Arrastra y suelta imágenes aquí, o haz clic para seleccionar
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, WEBP hasta 5MB (máximo 5 imágenes)
              </p>
            </div>

            {imagePreview.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {imagePreview.map((image, index) => (
                  <div key={index} className="relative rounded-lg overflow-hidden">
                    <img
                      src={image.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
            
          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Etiquetas (Opcional)
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
                >
                  {tag}
                  <button 
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <Input
                placeholder="Añadir etiqueta (ej. logotipo, diseño, app)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                containerClassName="flex-grow"
                leftIcon={<Tag size={18} />}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button 
                type="button"
                onClick={handleAddTag}
                className="ml-2"
                variant="outline"
                disabled={!tagInput.trim()}
              >
                Añadir
              </Button>
            </div>
          </div>
          
          {/* Terms and Guidelines */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start">
              <div className="text-blue-500 mt-0.5 mr-3">
                <Info size={20} />
              </div>
              <div>
                <h3 className="font-medium text-blue-800 mb-1">Lineamientos para Anuncios</h3>
                <p className="text-sm text-blue-700">
                  Tu anuncio debe ser preciso, honesto y claro. No se permiten contenidos ofensivos, ilegales o fraudulentos.
                  Asegúrate de que toda la información proporcionada es exacta y que las imágenes son relevantes para el servicio ofrecido.
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button 
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creando...' : 'Publicar Anuncio'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListingPage;