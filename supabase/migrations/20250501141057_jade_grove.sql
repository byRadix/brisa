/*
  # Database Schema Setup
  
  1. Tables
    - profiles: User profile information
    - listings: Marketplace listings
    - ratings: User ratings and reviews
    - portfolio_items: User portfolio entries
  
  2. Security
    - Enable RLS on all tables
    - Add policies for CRUD operations
    
  3. Triggers
    - Add updated_at triggers
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  full_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  location TEXT,
  skills TEXT[],
  hourly_rate NUMERIC,
  category TEXT,
  availability TEXT
);

-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  price_type TEXT NOT NULL,
  image_url TEXT,
  status TEXT DEFAULT 'active' NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  location TEXT,
  contact_info TEXT,
  tags TEXT[]
);

-- Create ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  freelancer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  listing_id UUID REFERENCES listings(id) ON DELETE SET NULL
);

-- Create portfolio items table
CREATE TABLE IF NOT EXISTS portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  link TEXT
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Profiles policies
  DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
  DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
  
  -- Listings policies
  DROP POLICY IF EXISTS "Listings are viewable by everyone" ON listings;
  DROP POLICY IF EXISTS "Users can insert their own listings" ON listings;
  DROP POLICY IF EXISTS "Users can update their own listings" ON listings;
  DROP POLICY IF EXISTS "Users can delete their own listings" ON listings;
  
  -- Ratings policies
  DROP POLICY IF EXISTS "Ratings are viewable by everyone" ON ratings;
  DROP POLICY IF EXISTS "Users can insert ratings" ON ratings;
  DROP POLICY IF EXISTS "Users can update their own ratings" ON ratings;
  DROP POLICY IF EXISTS "Users can delete their own ratings" ON ratings;
  
  -- Portfolio items policies
  DROP POLICY IF EXISTS "Portfolio items are viewable by everyone" ON portfolio_items;
  DROP POLICY IF EXISTS "Users can insert their own portfolio items" ON portfolio_items;
  DROP POLICY IF EXISTS "Users can update their own portfolio items" ON portfolio_items;
  DROP POLICY IF EXISTS "Users can delete their own portfolio items" ON portfolio_items;
END $$;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Listings policies
CREATE POLICY "Listings are viewable by everyone"
  ON listings
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own listings"
  ON listings
  FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own listings"
  ON listings
  FOR UPDATE
  USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own listings"
  ON listings
  FOR DELETE
  USING (auth.uid() = author_id);

-- Ratings policies
CREATE POLICY "Ratings are viewable by everyone"
  ON ratings
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert ratings"
  ON ratings
  FOR INSERT
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Users can update their own ratings"
  ON ratings
  FOR UPDATE
  USING (auth.uid() = client_id);

CREATE POLICY "Users can delete their own ratings"
  ON ratings
  FOR DELETE
  USING (auth.uid() = client_id);

-- Portfolio items policies
CREATE POLICY "Portfolio items are viewable by everyone"
  ON portfolio_items
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own portfolio items"
  ON portfolio_items
  FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own portfolio items"
  ON portfolio_items
  FOR UPDATE
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own portfolio items"
  ON portfolio_items
  FOR DELETE
  USING (auth.uid() = profile_id);

-- Add triggers for updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

DROP TRIGGER IF EXISTS update_listings_updated_at ON listings;
CREATE TRIGGER update_listings_updated_at
BEFORE UPDATE ON listings
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();