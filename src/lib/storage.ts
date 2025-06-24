import { supabase } from './supabaseClient';

const AVATAR_BUCKET = 'avatars';
const LISTINGS_BUCKET = 'listings';
const AVATAR_MAX_SIZE = 2 * 1024 * 1024; // 2MB
const LISTING_MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_AVATAR_TYPES = ['image/jpeg', 'image/png'];
const ALLOWED_LISTING_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export interface UploadedImage {
  path: string;
  url: string;
}

export const validateImage = (
  file: File, 
  type: 'avatar' | 'listing' = 'listing'
): string | null => {
  const maxSize = type === 'avatar' ? AVATAR_MAX_SIZE : LISTING_MAX_SIZE;
  const allowedTypes = type === 'avatar' ? ALLOWED_AVATAR_TYPES : ALLOWED_LISTING_TYPES;
  
  if (!allowedTypes.includes(file.type)) {
    return `Formato de archivo no válido. Solo se permiten ${type === 'avatar' ? 'JPG y PNG' : 'JPG, PNG y WebP'}.`;
  }
  
  if (file.size > maxSize) {
    return `El archivo es demasiado grande. El tamaño máximo permitido es ${maxSize / (1024 * 1024)}MB.`;
  }
  
  return null;
};

export const uploadAvatar = async (
  file: File,
  userId: string
): Promise<UploadedImage> => {
  const error = validateImage(file, 'avatar');
  if (error) throw new Error(error);

  // Delete previous avatar if exists
  const { data: existingFiles } = await supabase.storage
    .from(AVATAR_BUCKET)
    .list(userId);
    
  if (existingFiles?.length) {
    await supabase.storage
      .from(AVATAR_BUCKET)
      .remove(existingFiles.map(f => `${userId}/${f.name}`));
  }

  // Upload new avatar
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/avatar-${Date.now()}.${fileExt}`;
  
  const { data, error: uploadError } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(fileName, file);
    
  if (uploadError) {
    throw new Error('Error al subir el avatar: ' + uploadError.message);
  }
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(AVATAR_BUCKET)
    .getPublicUrl(data.path);

  // Update profile
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ 
      avatar_url: publicUrl,
      avatar_last_updated: new Date().toISOString()
    })
    .eq('id', userId);

  if (updateError) {
    throw new Error('Error al actualizar el perfil: ' + updateError.message);
  }
    
  return {
    path: data.path,
    url: publicUrl
  };
};

export const uploadListingImage = async (
  file: File,
  userId: string,
  listingId: string
): Promise<UploadedImage> => {
  const error = validateImage(file, 'listing');
  if (error) throw new Error(error);

  // Generate a unique filename with user and listing context
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${listingId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  
  const { data, error: uploadError } = await supabase.storage
    .from(LISTINGS_BUCKET)
    .upload(fileName, file);
    
  if (uploadError) {
    throw new Error('Error al subir la imagen: ' + uploadError.message);
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from(LISTINGS_BUCKET)
    .getPublicUrl(data.path);
    
  return {
    path: data.path,
    url: publicUrl
  };
};

export const deleteListingImage = async (path: string): Promise<void> => {
  const { error } = await supabase.storage
    .from(LISTINGS_BUCKET)
    .remove([path]);
    
  if (error) {
    throw new Error('Error al eliminar la imagen: ' + error.message);
  }
};

export const deleteListingImages = async (paths: string[]): Promise<void> => {
  if (paths.length === 0) return;
  
  const { error } = await supabase.storage
    .from(LISTINGS_BUCKET)
    .remove(paths);
    
  if (error) {
    throw new Error('Error al eliminar las imágenes: ' + error.message);
  }
};