/*
  # Update listings table and storage configuration
  
  1. Changes
    - Remove single image_url column
    - Add image_urls array column
    - Configure storage bucket settings
    - Update storage policies
    - Update RLS policies
  
  2. Security
    - Enable RLS on listings table
    - Add policies for CRUD operations
    - Configure storage access policies
*/

-- Update listings table to support multiple images
ALTER TABLE listings 
DROP COLUMN IF EXISTS image_url,
ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Update storage bucket configuration
UPDATE storage.buckets
SET public = true,
    file_size_limit = 5242880, -- 5MB in bytes
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp']
WHERE id = 'listings';

-- Drop existing storage policies if they exist
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

-- Ensure RLS is enabled
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Update or create RLS policies for listings
DO $$ BEGIN
  DROP POLICY IF EXISTS "Listings are viewable by everyone" ON listings;
  DROP POLICY IF EXISTS "Users can insert their own listings" ON listings;
  DROP POLICY IF EXISTS "Users can update their own listings" ON listings;
  DROP POLICY IF EXISTS "Users can delete their own listings" ON listings;
END $$;

CREATE POLICY "Listings are viewable by everyone"
ON listings FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own listings"
ON listings FOR INSERT
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own listings"
ON listings FOR UPDATE
USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own listings"
ON listings FOR DELETE
USING (auth.uid() = author_id);