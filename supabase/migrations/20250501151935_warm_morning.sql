/*
  # Image Management System Setup
  
  1. Storage Configuration
    - Creates avatars bucket with 2MB limit
    - Updates listings bucket with 5MB limit
    - Sets proper MIME type restrictions
  
  2. Profile Updates
    - Adds avatar_last_updated column to profiles table
  
  3. Storage Policies
    - Configures public access for viewing
    - Sets up user-specific upload/update/delete policies
*/

-- Create avatars bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Configure avatars bucket
UPDATE storage.buckets
SET public = true,
    file_size_limit = 2097152, -- 2MB in bytes
    allowed_mime_types = ARRAY['image/jpeg', 'image/png']
WHERE id = 'avatars';

-- Update listings bucket configuration
UPDATE storage.buckets
SET file_size_limit = 5242880, -- 5MB in bytes
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp']
WHERE id = 'listings';

-- Add avatar_last_updated to profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS avatar_last_updated TIMESTAMPTZ DEFAULT now();

-- Drop existing avatar storage policies
DO $$ BEGIN
  DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
  DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
  DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
  DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;
END $$;

-- Create avatar storage policies
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars'
  AND auth.role() = 'authenticated'
  AND (storage.extension(name) = 'jpg' OR storage.extension(name) = 'jpeg' OR storage.extension(name) = 'png')
);

CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars'
  AND auth.uid() = owner
);

CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars'
  AND auth.uid() = owner
);