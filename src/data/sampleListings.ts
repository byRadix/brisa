export interface SampleListing {
  id: string;
  title: string;
  description: string;
  price: number;
  priceRange?: string;
  category: string;
  keywords: string[];
  deliveryTime: string;
  experienceLevel: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Experto';
  location: string;
  modality: 'Presencial' | 'Remoto' | 'Híbrido';
  keyBenefits: string[];
  author: {
    name: string;
    username: string;
    avatar: string;
    rating: number;
    reviewsCount: number;
  };
  images: string[];
  contactInfo: string;
  tags: string[];
}

export const sampleListings: SampleListing[] = [
  {
    id: 'sample-1',
    title: 'Desarrollo de Aplicación Web Completa con React y Node.js',
    description: `¿Necesitas una aplicación web moderna, escalable y de alto rendimiento? Soy un desarrollador Full Stack especializado en tecnologías de vanguardia con más de 6 años de experiencia creando soluciones digitales para empresas de todos los tamaños.

Mi servicio incluye el desarrollo completo de tu aplicación web desde cero, utilizando las mejores prácticas de la industria y las tecnologías más actuales del mercado. Trabajo con React para el frontend, garantizando una interfaz de usuario intuitiva y responsive, y Node.js con Express para el backend, asegurando un rendimiento óptimo y escalabilidad.

El proceso incluye análisis de requisitos, diseño de arquitectura, desarrollo de base de datos (PostgreSQL/MongoDB), implementación de APIs RESTful, integración de sistemas de autenticación seguros, testing automatizado y despliegue en la nube (AWS/Vercel/Heroku).

Además, proporciono documentación técnica completa, código limpio y bien comentado, y soporte post-lanzamiento durante 30 días. Cada proyecto incluye optimización SEO básica, implementación de mejores prácticas de seguridad y configuración de analytics para monitoreo de rendimiento.

Mi enfoque se centra en la comunicación constante con el cliente, entregas incrementales para validación continua, y la creación de soluciones que no solo cumplan los requisitos actuales, sino que también sean fácilmente escalables para futuras necesidades del negocio.`,
    price: 85,
    priceRange: '€75-95/hora según complejidad',
    category: 'Desarrollo Web',
    keywords: ['React', 'Node.js', 'Full Stack', 'API REST', 'PostgreSQL'],
    deliveryTime: '4-8 semanas según alcance',
    experienceLevel: 'Experto',
    location: 'Barcelona, España',
    modality: 'Remoto',
    keyBenefits: [
      'Código limpio y escalable con documentación completa',
      'Aplicación responsive optimizada para todos los dispositivos',
      'Integración de sistemas de pago y autenticación seguros',
      'Soporte técnico incluido durante 30 días post-lanzamiento'
    ],
    author: {
      name: 'Alejandro Martín',
      username: 'alex_fullstack',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.9,
      reviewsCount: 47
    },
    images: [
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    contactInfo: `Email: alejandro.martin.dev@gmail.com
WhatsApp: +34 612 345 678
LinkedIn: /in/alejandro-martin-fullstack
Portfolio: www.alexmartin-dev.com

Horario de contacto: Lunes a Viernes 9:00-18:00 CET
Respuesta garantizada en menos de 4 horas`,
    tags: ['desarrollo', 'react', 'nodejs', 'fullstack', 'api', 'postgresql', 'javascript', 'typescript']
  },
  {
    id: 'sample-2',
    title: 'Consultoría en Marketing Digital y Estrategia de Crecimiento',
    description: `¿Tu negocio necesita un impulso digital real y medible? Como consultora especializada en marketing digital con más de 8 años de experiencia, he ayudado a más de 150 empresas a multiplicar sus ventas online y construir una presencia digital sólida y rentable.

Mi servicio de consultoría integral abarca desde el análisis profundo de tu situación actual hasta la implementación de estrategias personalizadas que generen resultados tangibles. Trabajo con un enfoque data-driven, utilizando herramientas avanzadas de analytics para identificar oportunidades de crecimiento y optimizar cada euro invertido en marketing.

El proceso incluye auditoría completa de tu presencia digital actual, análisis de competencia y mercado objetivo, desarrollo de buyer personas detalladas, creación de estrategia de contenidos, optimización SEO técnica y de contenido, gestión de campañas de Google Ads y Facebook Ads, implementación de email marketing automatizado, y configuración de sistemas de tracking y conversión.

Además, proporciono formación a tu equipo interno para que puedan mantener y escalar las estrategias implementadas. Cada consultoría incluye reportes mensuales detallados con métricas clave, recomendaciones de optimización continua, y acceso directo a mí para consultas urgentes.

Mi metodología se basa en la implementación gradual y el testing constante, asegurando que cada acción esté respaldada por datos y genere un ROI positivo. Trabajo especialmente bien con empresas B2B, e-commerce, y servicios profesionales que buscan un crecimiento sostenible y escalable.`,
    price: 1200,
    priceRange: '€800-2000 según duración del proyecto',
    category: 'Marketing Digital',
    keywords: ['SEO', 'Google Ads', 'Estrategia Digital', 'Analytics', 'Growth Hacking'],
    deliveryTime: '2-3 meses para implementación completa',
    experienceLevel: 'Experto',
    location: 'Madrid, España',
    modality: 'Híbrido',
    keyBenefits: [
      'Aumento promedio del 300% en leads cualificados en 6 meses',
      'Estrategia personalizada basada en análisis profundo de datos',
      'Formación incluida para tu equipo interno',
      'ROI garantizado o devolución del 50% de la inversión'
    ],
    author: {
      name: 'Carmen Rodríguez',
      username: 'carmen_growth',
      avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.8,
      reviewsCount: 89
    },
    images: [
      'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    contactInfo: `Email: carmen@growthstrategy.es
Teléfono: +34 687 123 456
LinkedIn: /in/carmen-rodriguez-growth
Web: www.carmengrowth.com

Consulta inicial gratuita de 30 minutos
Disponible para reuniones presenciales en Madrid
Horario: Lunes a Viernes 10:00-19:00 CET`,
    tags: ['marketing', 'seo', 'google-ads', 'analytics', 'growth', 'estrategia', 'consultoria', 'digital']
  }
];

// Función para obtener una publicación por ID
export const getSampleListingById = (id: string): SampleListing | undefined => {
  return sampleListings.find(listing => listing.id === id);
};

// Función para obtener publicaciones por categoría
export const getSampleListingsByCategory = (category: string): SampleListing[] => {
  return sampleListings.filter(listing => listing.category === category);
};