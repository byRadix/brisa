-- =====================================================
-- BRIISA.APP DATABASE BACKUP
-- Copia de seguridad completa compatible con PostgreSQL
-- Generado desde estructura Supabase
-- Fecha: 2025-01-01
-- =====================================================

-- Configuración inicial
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Crear extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA public;

-- =====================================================
-- FUNCIONES Y TRIGGERS
-- =====================================================

-- Función para actualizar timestamp de modificación
CREATE OR REPLACE FUNCTION public.update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Función para generar UUID v4
CREATE OR REPLACE FUNCTION public.gen_random_uuid()
RETURNS UUID AS $$
BEGIN
    RETURN uuid_generate_v4();
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- ESTRUCTURA DE TABLAS
-- =====================================================

-- Tabla: profiles
-- Información de perfiles de usuario
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY,
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
    availability TEXT,
    avatar_last_updated TIMESTAMPTZ DEFAULT now()
);

-- Tabla: listings
-- Anuncios del marketplace
CREATE TABLE IF NOT EXISTS public.listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL,
    price_type TEXT NOT NULL,
    status TEXT DEFAULT 'active' NOT NULL,
    author_id UUID NOT NULL,
    location TEXT,
    contact_info TEXT,
    tags TEXT[],
    image_urls TEXT[] DEFAULT ARRAY[]::TEXT[]
);

-- Tabla: ratings
-- Valoraciones y reseñas
CREATE TABLE IF NOT EXISTS public.ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    freelancer_id UUID NOT NULL,
    client_id UUID NOT NULL,
    listing_id UUID
);

-- Tabla: portfolio_items
-- Elementos del portafolio de usuarios
CREATE TABLE IF NOT EXISTS public.portfolio_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    profile_id UUID NOT NULL,
    link TEXT
);

-- Tabla: listing_images
-- Imágenes de los anuncios
CREATE TABLE IF NOT EXISTS public.listing_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    listing_id UUID NOT NULL,
    storage_path TEXT NOT NULL,
    url TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- =====================================================
-- RELACIONES Y CONSTRAINTS
-- =====================================================

-- Foreign Keys para listings
ALTER TABLE public.listings 
ADD CONSTRAINT listings_author_id_fkey 
FOREIGN KEY (author_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Foreign Keys para ratings
ALTER TABLE public.ratings 
ADD CONSTRAINT ratings_freelancer_id_fkey 
FOREIGN KEY (freelancer_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.ratings 
ADD CONSTRAINT ratings_client_id_fkey 
FOREIGN KEY (client_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.ratings 
ADD CONSTRAINT ratings_listing_id_fkey 
FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE SET NULL;

-- Foreign Keys para portfolio_items
ALTER TABLE public.portfolio_items 
ADD CONSTRAINT portfolio_items_profile_id_fkey 
FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Foreign Keys para listing_images
ALTER TABLE public.listing_images 
ADD CONSTRAINT listing_images_listing_id_fkey 
FOREIGN KEY (listing_id) REFERENCES public.listings(id) ON DELETE CASCADE;

-- =====================================================
-- ÍNDICES
-- =====================================================

-- Índices para profiles
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_category ON public.profiles(category);
CREATE INDEX IF NOT EXISTS idx_profiles_location ON public.profiles(location);

-- Índices para listings
CREATE INDEX IF NOT EXISTS idx_listings_author_id ON public.listings(author_id);
CREATE INDEX IF NOT EXISTS idx_listings_category ON public.listings(category);
CREATE INDEX IF NOT EXISTS idx_listings_status ON public.listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON public.listings(created_at);
CREATE INDEX IF NOT EXISTS idx_listings_price ON public.listings(price);
CREATE INDEX IF NOT EXISTS idx_listings_location ON public.listings(location);

-- Índices para ratings
CREATE INDEX IF NOT EXISTS idx_ratings_freelancer_id ON public.ratings(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_ratings_client_id ON public.ratings(client_id);
CREATE INDEX IF NOT EXISTS idx_ratings_listing_id ON public.ratings(listing_id);
CREATE INDEX IF NOT EXISTS idx_ratings_rating ON public.ratings(rating);

-- Índices para portfolio_items
CREATE INDEX IF NOT EXISTS idx_portfolio_items_profile_id ON public.portfolio_items(profile_id);

-- Índices para listing_images
CREATE INDEX IF NOT EXISTS idx_listing_images_listing_id ON public.listing_images(listing_id);
CREATE INDEX IF NOT EXISTS idx_listing_images_order ON public.listing_images("order");

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger para actualizar updated_at en profiles
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_modified_column();

-- Trigger para actualizar updated_at en listings
DROP TRIGGER IF EXISTS update_listings_updated_at ON public.listings;
CREATE TRIGGER update_listings_updated_at
    BEFORE UPDATE ON public.listings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_modified_column();

-- =====================================================
-- DATOS DE EJEMPLO (OPCIONAL)
-- =====================================================

-- Insertar perfiles de ejemplo
INSERT INTO public.profiles (id, full_name, username, bio, location, category, hourly_rate, availability, skills) VALUES
(
    '550e8400-e29b-41d4-a716-446655440001',
    'Ana García Martínez',
    'ana_garcia_design',
    'Diseñadora gráfica especializada en branding e identidad visual. Más de 5 años de experiencia trabajando con startups y empresas consolidadas.',
    'Madrid, España',
    'Diseño Gráfico',
    45.00,
    'Tiempo Completo',
    ARRAY['Photoshop', 'Illustrator', 'Figma', 'Branding', 'Logo Design']
),
(
    '550e8400-e29b-41d4-a716-446655440002',
    'Carlos Ruiz López',
    'carlos_dev',
    'Desarrollador Full Stack con experiencia en React, Node.js y PostgreSQL. Apasionado por crear aplicaciones web escalables y eficientes.',
    'Barcelona, España',
    'Desarrollo Web',
    60.00,
    'Medio Tiempo',
    ARRAY['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'AWS']
),
(
    '550e8400-e29b-41d4-a716-446655440003',
    'María Fernández Silva',
    'maria_marketing',
    'Especialista en marketing digital y SEO. Ayudo a empresas a aumentar su visibilidad online y generar más leads cualificados.',
    'Valencia, España',
    'Marketing Digital',
    40.00,
    'Disponible por Proyecto',
    ARRAY['SEO', 'Google Ads', 'Facebook Ads', 'Analytics', 'Content Marketing']
);

-- Insertar listings de ejemplo
INSERT INTO public.listings (id, title, description, category, price, price_type, author_id, location, contact_info, tags, status) VALUES
(
    '660e8400-e29b-41d4-a716-446655440001',
    'Diseño de Logotipo Profesional',
    'Creo logotipos únicos y memorables que reflejan la esencia de tu marca. Incluye múltiples conceptos, revisiones ilimitadas y archivos en todos los formatos necesarios.',
    'Diseño Gráfico',
    299.00,
    'proyecto',
    '550e8400-e29b-41d4-a716-446655440001',
    'Madrid, España',
    'Email: ana.garcia@email.com | WhatsApp: +34 600 123 456',
    ARRAY['logo', 'branding', 'identidad', 'diseño'],
    'active'
),
(
    '660e8400-e29b-41d4-a716-446655440002',
    'Desarrollo de Aplicación Web Completa',
    'Desarrollo aplicaciones web modernas usando React y Node.js. Desde la planificación hasta el despliegue, incluyendo base de datos y API REST.',
    'Desarrollo Web',
    75.00,
    'hora',
    '550e8400-e29b-41d4-a716-446655440002',
    'Barcelona, España',
    'Email: carlos.ruiz@email.com | Teléfono: +34 600 789 012',
    ARRAY['react', 'nodejs', 'fullstack', 'api'],
    'active'
),
(
    '660e8400-e29b-41d4-a716-446655440003',
    'Estrategia SEO Completa',
    'Optimizo tu sitio web para motores de búsqueda. Incluye auditoría técnica, investigación de palabras clave, optimización on-page y estrategia de contenidos.',
    'Marketing Digital',
    500.00,
    'proyecto',
    '550e8400-e29b-41d4-a716-446655440003',
    'Valencia, España',
    'Email: maria.fernandez@email.com | LinkedIn: /in/maria-fernandez-seo',
    ARRAY['seo', 'marketing', 'google', 'posicionamiento'],
    'active'
);

-- Insertar ratings de ejemplo
INSERT INTO public.ratings (rating, comment, freelancer_id, client_id, listing_id) VALUES
(5, 'Excelente trabajo, muy profesional y entregó antes del plazo acordado.', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001'),
(4, 'Buen desarrollo, código limpio y bien documentado. Recomendado.', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440002'),
(5, 'Increíble mejora en el posicionamiento. Los resultados hablan por sí solos.', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440003');

-- Insertar portfolio items de ejemplo
INSERT INTO public.portfolio_items (title, description, profile_id, link) VALUES
('Rediseño de Marca para Startup Tech', 'Proyecto completo de rebranding incluyendo logo, paleta de colores y guía de estilo.', '550e8400-e29b-41d4-a716-446655440001', 'https://behance.net/proyecto1'),
('E-commerce con React y Stripe', 'Tienda online completa con carrito de compras, pagos y panel de administración.', '550e8400-e29b-41d4-a716-446655440002', 'https://github.com/carlos/ecommerce'),
('Campaña SEO para Restaurante', 'Aumento del 300% en tráfico orgánico en 6 meses para cadena de restaurantes.', '550e8400-e29b-41d4-a716-446655440003', 'https://portfolio.maria-seo.com/caso-restaurante');

-- =====================================================
-- CONFIGURACIÓN DE SEGURIDAD (OPCIONAL)
-- =====================================================

-- Crear roles básicos
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'app_user') THEN
        CREATE ROLE app_user;
    END IF;
    
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'app_admin') THEN
        CREATE ROLE app_admin;
    END IF;
END
$$;

-- Permisos para app_user (usuarios normales)
GRANT SELECT, INSERT, UPDATE ON public.profiles TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.listings TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ratings TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolio_items TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.listing_images TO app_user;

-- Permisos para app_admin (administradores)
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO app_admin;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO app_admin;

-- =====================================================
-- VISTAS ÚTILES
-- =====================================================

-- Vista para listings con información del autor
CREATE OR REPLACE VIEW public.listings_with_author AS
SELECT 
    l.*,
    p.full_name as author_name,
    p.username as author_username,
    p.avatar_url as author_avatar,
    p.location as author_location,
    COALESCE(AVG(r.rating), 0) as author_rating,
    COUNT(r.id) as author_reviews_count
FROM public.listings l
LEFT JOIN public.profiles p ON l.author_id = p.id
LEFT JOIN public.ratings r ON r.freelancer_id = p.id
GROUP BY l.id, p.id;

-- Vista para estadísticas de freelancers
CREATE OR REPLACE VIEW public.freelancer_stats AS
SELECT 
    p.id,
    p.full_name,
    p.username,
    COUNT(DISTINCT l.id) as total_listings,
    COUNT(DISTINCT r.id) as total_reviews,
    COALESCE(AVG(r.rating), 0) as average_rating,
    COUNT(DISTINCT l.id) FILTER (WHERE l.status = 'active') as active_listings
FROM public.profiles p
LEFT JOIN public.listings l ON l.author_id = p.id
LEFT JOIN public.ratings r ON r.freelancer_id = p.id
GROUP BY p.id;

-- =====================================================
-- FUNCIONES DE UTILIDAD
-- =====================================================

-- Función para buscar listings
CREATE OR REPLACE FUNCTION public.search_listings(
    search_term TEXT DEFAULT '',
    category_filter TEXT DEFAULT '',
    min_price NUMERIC DEFAULT 0,
    max_price NUMERIC DEFAULT 999999,
    location_filter TEXT DEFAULT ''
)
RETURNS TABLE (
    id UUID,
    title TEXT,
    description TEXT,
    category TEXT,
    price NUMERIC,
    price_type TEXT,
    author_name TEXT,
    author_rating NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        l.id,
        l.title,
        l.description,
        l.category,
        l.price,
        l.price_type,
        lwa.author_name,
        lwa.author_rating
    FROM public.listings_with_author lwa
    WHERE 
        l.status = 'active'
        AND (search_term = '' OR l.title ILIKE '%' || search_term || '%' OR l.description ILIKE '%' || search_term || '%')
        AND (category_filter = '' OR l.category = category_filter)
        AND l.price >= min_price
        AND l.price <= max_price
        AND (location_filter = '' OR l.location ILIKE '%' || location_filter || '%')
    ORDER BY l.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- COMENTARIOS Y DOCUMENTACIÓN
-- =====================================================

COMMENT ON TABLE public.profiles IS 'Perfiles de usuario con información de freelancers';
COMMENT ON TABLE public.listings IS 'Anuncios del marketplace de servicios';
COMMENT ON TABLE public.ratings IS 'Valoraciones y reseñas de freelancers';
COMMENT ON TABLE public.portfolio_items IS 'Elementos del portafolio de usuarios';
COMMENT ON TABLE public.listing_images IS 'Imágenes asociadas a los anuncios';

COMMENT ON COLUMN public.profiles.skills IS 'Array de habilidades del freelancer';
COMMENT ON COLUMN public.listings.image_urls IS 'Array de URLs de imágenes del anuncio';
COMMENT ON COLUMN public.listings.tags IS 'Array de etiquetas para búsqueda';
COMMENT ON COLUMN public.ratings.rating IS 'Valoración de 1 a 5 estrellas';

-- =====================================================
-- FINALIZACIÓN
-- =====================================================

-- Actualizar estadísticas de la base de datos
ANALYZE;

-- Mensaje de confirmación
DO $$
BEGIN
    RAISE NOTICE 'Base de datos Briisa.app restaurada correctamente';
    RAISE NOTICE 'Tablas creadas: profiles, listings, ratings, portfolio_items, listing_images';
    RAISE NOTICE 'Funciones creadas: update_modified_column, search_listings';
    RAISE NOTICE 'Vistas creadas: listings_with_author, freelancer_stats';
    RAISE NOTICE 'Datos de ejemplo insertados para 3 usuarios y 3 anuncios';
END
$$;