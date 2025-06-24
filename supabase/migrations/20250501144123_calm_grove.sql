/*
  # Create listing images table and policies

  1. New Tables
    - `listing_images`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz)
      - `listing_id` (uuid, foreign key to listings)
      - `storage_path` (text)
      - `url` (text)
      - `order` (integer)

  2. Security
    - Enable RLS on `listing_images` table
*/

-- Create listing_images table if it doesn't exist
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS listing_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    listing_id UUID REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
    storage_path TEXT NOT NULL,
    url TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
  );
EXCEPTION
  WHEN duplicate_table THEN
    NULL;
END $$;

-- Enable RLS if not already enabled
DO $$ BEGIN
  ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

-- Drop existing policies if they exist and recreate them
DO $$ BEGIN
  DROP POLICY IF EXISTS "Listing images are viewable by everyone" ON listing_images;
  DROP POLICY IF EXISTS "Users can insert images for their listings" ON listing_images;
  DROP POLICY IF EXISTS "Users can update images for their listings" ON listing_images;
  DROP POLICY IF EXISTS "Users can delete images for their listings" ON listing_images;
END $$;

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