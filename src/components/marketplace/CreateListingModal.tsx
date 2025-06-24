import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { uploadListingImage, validateImage } from '../../lib/storage';
import Button from '../ui/Button';
import Input from '../ui/Input';
import toast from 'react-hot-toast';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

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

const CreateListingModal: React.FC<CreateListingModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { user } = useAuth();
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
  const [imagePreview, setImagePreview] = useState<ImagePreview[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState('');

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

  const onDrop = useCallback((acceptedFiles: File[]) => {
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

  const resetForm = () => {
    setFormData({
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
    setImagePreview([]);
    setErrors({});
    setTagInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (!user) {
      toast.error('Debes iniciar sesión para crear un anuncio');
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
      resetForm();
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error creating listing:', error);
      toast.error(error.message || 'Error al crear el anuncio');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={handleClose}></div>
        
        <div className="relative w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Crear Nuevo Anuncio</h2>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Información Básica</h3>
              
              <Input
                label="Título del Anuncio"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={errors.title}
                placeholder="Ej: Diseño de logotipos profesionales"
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
                  className={`w-full rounded-lg border ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  } bg-white py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all`}
                  rows={4}
                  placeholder="Describe tu servicio en detalle..."
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

            {/* Contact and Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Contacto y Ubicación</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Información de Contacto *
                  </label>
                  <textarea
                    name="contact_info"
                    value={formData.contact_info}
                    onChange={handleChange}
                    className={`w-full rounded-lg border ${
                      errors.contact_info ? 'border-red-500' : 'border-gray-300'
                    } bg-white py-2 px-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all`}
                    rows={3}
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

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creando...' : 'Crear Anuncio'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateListingModal;