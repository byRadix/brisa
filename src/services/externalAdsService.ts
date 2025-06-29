import { ExternalAd, ExternalAdResponse } from '../types/externalAds';

// Mock external database service
// In a real implementation, this would connect to your external database
class ExternalAdsService {
  private baseUrl = import.meta.env.VITE_EXTERNAL_DB_URL || 'https://api.external-ads.com';
  private apiKey = import.meta.env.VITE_EXTERNAL_DB_API_KEY || 'mock-api-key';

  // Mock data for demonstration
  private mockAds: ExternalAd[] = [
    {
      id: 'ext-001',
      title: 'Desarrollo de Aplicación Móvil iOS/Android',
      description: 'Ofrezco servicios de desarrollo de aplicaciones móviles nativas para iOS y Android. Experiencia de 8 años en el sector, especializado en apps de e-commerce, fintech y salud. Incluyo diseño UI/UX, desarrollo completo, testing y publicación en stores.',
      postDate: '2025-01-01T10:30:00Z',
      user: {
        id: 'user-001',
        name: 'Roberto Fernández',
        email: 'roberto.fernandez@email.com',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
        location: 'Madrid, España',
        joinDate: '2022-03-15T00:00:00Z'
      },
      price: {
        amount: 4500,
        currency: 'EUR',
        type: 'fixed'
      },
      category: 'Desarrollo Móvil',
      status: 'active',
      images: [
        'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      media: [
        {
          type: 'image',
          url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
          caption: 'Ejemplo de app desarrollada'
        }
      ],
      tags: ['iOS', 'Android', 'React Native', 'Swift', 'Kotlin'],
      location: 'Madrid, España',
      contactInfo: {
        phone: '+34 612 345 678',
        email: 'roberto.fernandez@email.com',
        website: 'https://robertodev.com'
      },
      views: 1247,
      featured: true,
      expiryDate: '2025-03-01T23:59:59Z',
      rawData: {
        database_id: 'ext_db_001',
        source_table: 'advertisements',
        created_by_system: 'external_portal_v2',
        last_modified: '2025-01-01T15:45:00Z',
        internal_notes: 'Premium user - verified developer',
        payment_status: 'paid',
        boost_level: 3,
        original_post_language: 'es',
        auto_translated: false,
        moderation_status: 'approved',
        quality_score: 9.2,
        engagement_metrics: {
          clicks: 156,
          saves: 23,
          shares: 8,
          inquiries: 12
        }
      }
    },
    {
      id: 'ext-002',
      title: 'Consultoría en Transformación Digital para PyMEs',
      description: 'Ayudo a pequeñas y medianas empresas en su proceso de transformación digital. Servicios incluyen: auditoría tecnológica, implementación de CRM/ERP, automatización de procesos, migración a la nube, y formación de equipos. Más de 50 empresas transformadas exitosamente.',
      postDate: '2025-01-01T08:15:00Z',
      user: {
        id: 'user-002',
        name: 'Ana Martínez Consulting',
        email: 'ana@digitalconsulting.es',
        avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150',
        location: 'Barcelona, España',
        joinDate: '2021-08-20T00:00:00Z'
      },
      price: {
        amount: 150,
        currency: 'EUR',
        type: 'hourly'
      },
      category: 'Consultoría Empresarial',
      status: 'active',
      images: [
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      media: [
        {
          type: 'document',
          url: 'https://example.com/portfolio.pdf',
          caption: 'Portfolio de casos de éxito'
        }
      ],
      tags: ['Transformación Digital', 'CRM', 'ERP', 'Automatización', 'Cloud'],
      location: 'Barcelona, España',
      contactInfo: {
        phone: '+34 687 123 456',
        email: 'ana@digitalconsulting.es',
        website: 'https://digitalconsulting.es'
      },
      views: 892,
      featured: false,
      expiryDate: '2025-02-15T23:59:59Z',
      rawData: {
        database_id: 'ext_db_002',
        source_table: 'advertisements',
        created_by_system: 'external_portal_v2',
        last_modified: '2025-01-01T12:30:00Z',
        internal_notes: 'Verified business consultant',
        payment_status: 'paid',
        boost_level: 1,
        original_post_language: 'es',
        auto_translated: false,
        moderation_status: 'approved',
        quality_score: 8.7,
        engagement_metrics: {
          clicks: 89,
          saves: 15,
          shares: 4,
          inquiries: 7
        }
      }
    },
    {
      id: 'ext-003',
      title: 'Diseño Gráfico y Branding Completo',
      description: 'Estudio de diseño especializado en identidad visual corporativa. Creamos logotipos, manuales de marca, papelería corporativa, diseño web y material publicitario. Trabajamos con startups y empresas consolidadas. Portfolio con más de 200 proyectos exitosos.',
      postDate: '2024-12-31T16:45:00Z',
      user: {
        id: 'user-003',
        name: 'Creative Studio Plus',
        email: 'hello@creativestudioplus.com',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
        location: 'Valencia, España',
        joinDate: '2020-11-10T00:00:00Z'
      },
      price: {
        amount: 800,
        currency: 'EUR',
        type: 'fixed'
      },
      category: 'Diseño Gráfico',
      status: 'active',
      images: [
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      media: [
        {
          type: 'image',
          url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
          caption: 'Ejemplo de branding desarrollado'
        }
      ],
      tags: ['Branding', 'Logo', 'Identidad Visual', 'Diseño Web', 'Papelería'],
      location: 'Valencia, España',
      contactInfo: {
        phone: '+34 654 987 321',
        email: 'hello@creativestudioplus.com',
        website: 'https://creativestudioplus.com'
      },
      views: 634,
      featured: true,
      expiryDate: '2025-01-31T23:59:59Z',
      rawData: {
        database_id: 'ext_db_003',
        source_table: 'advertisements',
        created_by_system: 'external_portal_v1',
        last_modified: '2024-12-31T18:20:00Z',
        internal_notes: 'Long-term client - excellent track record',
        payment_status: 'paid',
        boost_level: 2,
        original_post_language: 'es',
        auto_translated: false,
        moderation_status: 'approved',
        quality_score: 9.5,
        engagement_metrics: {
          clicks: 78,
          saves: 19,
          shares: 6,
          inquiries: 9
        }
      }
    }
  ];

  async fetchAds(page: number = 1, limit: number = 10): Promise<ExternalAdResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // In a real implementation, this would be:
      // const response = await fetch(`${this.baseUrl}/ads?page=${page}&limit=${limit}`, {
      //   headers: {
      //     'Authorization': `Bearer ${this.apiKey}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // 
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // 
      // const data = await response.json();

      // Mock response with pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedAds = this.mockAds.slice(startIndex, endIndex);

      return {
        success: true,
        data: paginatedAds,
        total: this.mockAds.length,
        page,
        limit
      };
    } catch (error) {
      console.error('Error fetching external ads:', error);
      return {
        success: false,
        data: [],
        total: 0,
        page,
        limit,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async fetchAdById(id: string): Promise<ExternalAd | null> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // In a real implementation:
      // const response = await fetch(`${this.baseUrl}/ads/${id}`, {
      //   headers: {
      //     'Authorization': `Bearer ${this.apiKey}`,
      //     'Content-Type': 'application/json'
      //   }
      // });

      const ad = this.mockAds.find(ad => ad.id === id);
      return ad || null;
    } catch (error) {
      console.error('Error fetching ad by ID:', error);
      return null;
    }
  }

  async searchAds(query: string, category?: string): Promise<ExternalAdResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));

      let filteredAds = this.mockAds;

      if (query) {
        filteredAds = filteredAds.filter(ad =>
          ad.title.toLowerCase().includes(query.toLowerCase()) ||
          ad.description.toLowerCase().includes(query.toLowerCase()) ||
          ad.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
      }

      if (category) {
        filteredAds = filteredAds.filter(ad => ad.category === category);
      }

      return {
        success: true,
        data: filteredAds,
        total: filteredAds.length,
        page: 1,
        limit: filteredAds.length
      };
    } catch (error) {
      console.error('Error searching ads:', error);
      return {
        success: false,
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        error: error instanceof Error ? error.message : 'Search failed'
      };
    }
  }
}

export const externalAdsService = new ExternalAdsService();