/*
  # Update storage configuration and policies

  1. Changes
    - Updates storage bucket configuration for listings
    - Sets file size limits and allowed MIME types
    - Creates updated storage policies with proper access control

  2. Security
    - Enables public read access for listing images
    - Restricts uploads to authenticated users
    - Limits file types to images
    - Sets 5MB file size limit
*/

-- Update storage bucket configuration
UPDATE storage.buckets
SET public = true,
    file_size_limit = 5242880, -- 5MB in bytes
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp']
WHERE id = 'listings';

-- Drop existing storage policies
DO $$ BEGIN
  DROP POLICY IF EXISTS "Listing images are publicly accessible" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload listing images" ON storage.objects;
  DROP POLICY IF EXISTS "Users can update their own listing images" ON storage.objects;
  DROP POLICY IF EXISTS "Users can delete their own listing images" ON storage.objects;
END $$;

-- Create updated storage policies
CREATE POLICY "Listing images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'listings');

CREATE POLICY "Authenticated users can upload listing images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'listings' 
  AND auth.role() = 'authenticated'
  AND (ARRAY['image/jpeg', 'image/png', 'image/webp'] @> ARRAY[storage.foldername(name)])
);

CREATE POLICY "Users can update their own listing images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'listings' 
  AND auth.uid() = owner
);

CREATE POLICY "Users can delete their own listing images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'listings' 
  AND auth.uid() = owner
);