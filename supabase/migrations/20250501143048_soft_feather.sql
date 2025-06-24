/*
  # Add listing images support
  
  1. New Tables
    - `listing_images`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `listing_id` (uuid, references listings)
      - `storage_path` (text)
      - `url` (text)
      - `order` (integer)
  
  2. Storage
    - Create listings bucket for image storage
  
  3. Security
    - Enable RLS on listing_images table
    - Add policies for authenticated users
*/

-- Create listing_images table
CREATE TABLE IF NOT EXISTS listing_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  storage_path TEXT NOT NULL,
  url TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0
);

-- Enable RLS
ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;

-- Create storage bucket for listings
INSERT INTO storage.buckets (id, name, public)
VALUES ('listings', 'listings', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Listing images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'listings');

CREATE POLICY "Authenticated users can upload listing images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'listings' 
  AND auth.role() = 'authenticated'
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

-- Create listing_images policies
CREATE POLICY "Listing images are viewable by everyone"
ON listing_images FOR SELECT
USING (true);

CREATE POLICY "Users can insert images for their listings"
ON listing_images FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM listings 
    WHERE id = listing_id 
    AND author_id = auth.uid()
  )
);

CREATE POLICY "Users can update images for their listings"
ON listing_images FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM listings 
    WHERE id = listing_id 
    AND author_id = auth.uid()
  )
);

CREATE POLICY "Users can delete images for their listings"
ON listing_images FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM listings 
    WHERE id = listing_id 
    AND author_id = auth.uid()
  )
);