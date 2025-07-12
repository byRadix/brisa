// Tipo para definir las modalidades de trabajo posibles
export type PublicationModality = 'presencial' | 'remoto';

export interface SamplePublication {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  modality: PublicationModality; // Nueva propiedad para modalidad de trabajo
  keywords: string[]; // Palabras clave para sistema de notificaciones personalizadas
  images: string[];
  seller: {
    id: string;
    name: string;
    rating: number;
  };
  datePosted: string;
}

export const samplePublications: SamplePublication[] = [
  {
    id: "pub001",
    title: "iPhone 13 Pro Max mojado",
    description: "Se me ha caido el Iphone a la piscina y el movil esta encendido porque recibe llamadas pero la pantalla esta en negro y no se ve, hay alguna solucion antes de cambaiar la pantalla.",
    price: 50,
    category: "Electrónicos",
    condition: "Usado - Como nuevo",
    location: "Ciudad de México",
    coordinates: {
      latitude: 19.4326,
      longitude: -99.1332
    },
    modality: "presencial", // Venta de producto físico requiere presencia
    keywords: [
      "iphone", "iphone 13", "iphone 13 pro max", "apple", "smartphone", "móvil", "celular",
      "pantalla", "reparación", "técnico", "servicio técnico", "apple store", "mojado", "agua",
      "piscina", "daño por agua", "pantalla negra", "encendido", "llamadas", "electrónicos"
    ],
    images: [
      "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    seller: {
      id: "user123",
      name: "Carlos Méndez",
      rating: 4.8
    },
    datePosted: "2024-01-15"
  },
  {
    id: "pub003", 
    title: "Necesito 1 camarero y 1 cocinero para un cumpleaños",
    description: "Necesito un camarero y una persona para que este encargada de la barbacoa y de hacer pizzas en el horno de la foto me ayuden como camareros y a la barbacoa, seria para el domingo7/7 de 18 a 24 horas .",
    price: 100,
    category: "Celebraciones",
    condition: "Urgente",
    location: "Lorca",
    coordinates: {
      latitude: 37.6711,
      longitude: -1.7017
    },
    modality: "presencial", // Servicio de hostelería requiere presencia física
    keywords: [
      "camarero", "cocinero", "chef", "hostelería", "restaurante", "catering", "eventos",
      "cumpleaños", "barbacoa", "pizza", "horno", "servicio", "domingo", "urgente",
      "trabajo temporal", "evento", "fiesta", "comida", "gastronomía", "servicio de mesa"
    ],
    images: [
      "https://www.globalmarketingdirecto.com/images/2019/HOSTELERIA.jpg",
      "https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202502/21/00119860002658____4__1200x1200.jpg"
    ],
    seller: {
      id: "user666",
      name: "Fran Navarro",
      rating: 4.9
    },
    datePosted: "2024-01-16"
  },
  {
    id: "pub004",
    title: "Desarrollador Frontend React/TypeScript",
    description: "Necesito un desarrollador frontend con experiencia en React y TypeScript para un proyecto de e-commerce. El trabajo incluye desarrollo de componentes reutilizables, integración con APIs, y optimización de rendimiento. Proyecto de 3 meses con posibilidad de extensión.",
    price: 2500,
    category: "Tecnología",
    condition: "Nuevo",
    location: "Remoto",
    coordinates: {
      latitude: 19.4326, // Coordenadas por defecto para trabajos remotos
      longitude: -99.1332
    },
    modality: "remoto", // Desarrollo de software se puede hacer remotamente
    keywords: [
      "desarrollador", "frontend", "react", "typescript", "javascript", "programador",
      "desarrollo web", "e-commerce", "tienda online", "componentes", "api", "apis",
      "optimización", "rendimiento", "proyecto", "remoto", "teletrabajo", "freelance",
      "programación", "web", "front-end", "front end", "reactjs", "ts", "js"
    ],
    images: [
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    seller: {
      id: "user789",
      name: "TechCorp Solutions",
      rating: 4.7
    },
    datePosted: "2024-01-17"
  },
  {
    id: "pub005",
    title: "Diseñador Gráfico para Branding",
    description: "Busco un diseñador gráfico creativo para crear la identidad visual completa de mi startup. Incluye logo, paleta de colores, tipografías, y aplicaciones en diferentes medios. Necesito alguien con experiencia en branding y diseño moderno.",
    price: 800,
    category: "Diseño",
    condition: "Nuevo",
    location: "Remoto",
    coordinates: {
      latitude: 19.4326,
      longitude: -99.1332
    },
    modality: "remoto", // Diseño gráfico se puede hacer remotamente
    keywords: [
      "diseñador", "diseño gráfico", "branding", "identidad visual", "logo", "logotipo",
      "paleta de colores", "tipografía", "tipografías", "startup", "empresa", "marca",
      "diseño moderno", "creativo", "ilustrador", "photoshop", "illustrator", "figma",
      "diseño", "gráfico", "visual", "creatividad", "remoto", "freelance"
    ],
    images: [
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    seller: {
      id: "user101",
      name: "Startup Innovadora",
      rating: 4.9
    },
    datePosted: "2024-01-18"
  },
  {
    id: "pub006",
    title: "Profesor de Inglés Presencial",
    description: "Necesito un profesor de inglés nativo o con nivel C2 para clases particulares en mi casa. 2 horas por semana, martes y jueves de 18:00 a 19:00. Enfocado en conversación y preparación para exámenes internacionales.",
    price: 25,
    category: "Educación",
    condition: "Nuevo",
    location: "Ciudad de México",
    coordinates: {
      latitude: 19.4326,
      longitude: -99.1332
    },
    modality: "presencial", // Clases particulares requieren presencia física
    keywords: [
      "profesor", "inglés", "inglés nativo", "clases particulares", "tutor", "maestro",
      "educación", "idiomas", "conversación", "exámenes", "c2", "nivel c2", "nativo",
      "preparación", "internacional", "toefl", "ielts", "cambridge", "certificación",
      "enseñanza", "aprendizaje", "idioma", "inglés americano", "inglés británico"
    ],
    images: [
      "https://images.pexels.com/photos/4778661/pexels-photo-4778661.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4778660/pexels-photo-4778660.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    seller: {
      id: "user202",
      name: "María González",
      rating: 4.8
    },
    datePosted: "2024-01-19"
  },
  {
    id: "pub007",
    title: "Redactor de Contenido Web",
    description: "Busco un redactor creativo para crear contenido SEO optimizado para mi blog de tecnología. Necesito 10 artículos de 1500 palabras cada uno. Temas: inteligencia artificial, desarrollo web, y tendencias tecnológicas.",
    price: 400,
    category: "Marketing",
    condition: "Nuevo",
    location: "Remoto",
    coordinates: {
      latitude: 19.4326,
      longitude: -99.1332
    },
    modality: "remoto", // Redacción de contenido se puede hacer remotamente
    keywords: [
      "redactor", "contenido", "web", "seo", "blog", "artículos", "escritor", "copywriter",
      "marketing", "tecnología", "inteligencia artificial", "ia", "ai", "desarrollo web",
      "tendencias", "tecnológicas", "palabras", "texto", "creativo", "optimización",
      "contenido digital", "redacción", "escritura", "blogger", "content writer", "remoto"
    ],
    images: [
      "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3183154/pexels-photo-3183154.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    seller: {
      id: "user303",
      name: "TechBlog Pro",
      rating: 4.6
    },
    datePosted: "2024-01-20"
  },
  {
    id: "pub008",
    title: "Plomero para Reparación Urgente",
    description: "Necesito un plomero profesional para reparar una fuga de agua en mi baño. El problema es urgente y necesito que venga hoy mismo. Zona centro de Guadalajara, dispuesto a pagar extra por urgencia.",
    price: 150,
    category: "Servicios",
    condition: "Urgente",
    location: "Guadalajara",
    coordinates: {
      latitude: 20.6597,
      longitude: -103.3496
    },
    modality: "presencial", // Reparaciones requieren presencia física
    keywords: [
      "plomero", "fontanero", "fontanería", "reparación", "fuga", "agua", "baño",
      "tubería", "urgente", "hoy", "profesional", "servicio", "manitas", "hogar",
      "casa", "reparaciones", "mantenimiento", "instalación", "desatascar",
      "desatrancar", "fuga de agua", "fontanería urgente", "plomería", "servicios"
    ],
    images: [
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/439392/pexels-photo-439392.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    seller: {
      id: "user404",
      name: "Carlos Ruiz",
      rating: 4.5
    },
    datePosted: "2024-01-21"
  }
];

export const getSamplePublicationById = (id: string): SamplePublication | undefined => {
  return samplePublications.find(pub => pub.id === id);
};

// Funciones de utilidad para filtrar por modalidad
export const getPublicationsByModality = (modality: PublicationModality): SamplePublication[] => {
  return samplePublications.filter(pub => pub.modality === modality);
};

export const getPresencialPublications = (): SamplePublication[] => {
  return getPublicationsByModality('presencial');
};

export const getRemotoPublications = (): SamplePublication[] => {
  return getPublicationsByModality('remoto');
};

// Función para obtener estadísticas de modalidades
export const getModalityStats = () => {
  const total = samplePublications.length;
  const presencial = getPresencialPublications().length;
  const remoto = getRemotoPublications().length;
  
  return {
    total,
    presencial,
    remoto,
    presencialPercentage: Math.round((presencial / total) * 100),
    remotoPercentage: Math.round((remoto / total) * 100)
  };
};

// Función para filtrar publicaciones por múltiples criterios
export const filterPublications = (filters: {
  modality?: PublicationModality;
  category?: string;
  maxPrice?: number;
  minPrice?: number;
  location?: string;
  keywords?: string[]; // Nuevo filtro por palabras clave
}): SamplePublication[] => {
  return samplePublications.filter(pub => {
    if (filters.modality && pub.modality !== filters.modality) return false;
    if (filters.category && pub.category !== filters.category) return false;
    if (filters.maxPrice && pub.price > filters.maxPrice) return false;
    if (filters.minPrice && pub.price < filters.minPrice) return false;
    if (filters.location && !pub.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    
    // Filtro por palabras clave
    if (filters.keywords && filters.keywords.length > 0) {
      const hasMatchingKeyword = filters.keywords.some(keyword =>
        pub.keywords.some(pubKeyword =>
          pubKeyword.toLowerCase().includes(keyword.toLowerCase())
        )
      );
      if (!hasMatchingKeyword) return false;
    }
    
    return true;
  });
};

// Funciones de utilidad para el sistema de palabras clave

/**
 * Busca publicaciones que coincidan con las palabras clave proporcionadas
 * @param keywords Array de palabras clave a buscar
 * @param exactMatch Si es true, busca coincidencias exactas; si es false, busca coincidencias parciales
 * @returns Array de publicaciones que coinciden con las palabras clave
 */
export const searchPublicationsByKeywords = (
  keywords: string[],
  exactMatch: boolean = false
): SamplePublication[] => {
  return samplePublications.filter(pub => {
    return keywords.some(keyword => {
      const lowerKeyword = keyword.toLowerCase();
      return pub.keywords.some(pubKeyword => {
        const lowerPubKeyword = pubKeyword.toLowerCase();
        return exactMatch 
          ? lowerPubKeyword === lowerKeyword
          : lowerPubKeyword.includes(lowerKeyword) || lowerKeyword.includes(lowerPubKeyword);
      });
    });
  });
};

/**
 * Obtiene todas las palabras clave únicas de todas las publicaciones
 * @returns Array de palabras clave únicas
 */
export const getAllUniqueKeywords = (): string[] => {
  const allKeywords = samplePublications.flatMap(pub => pub.keywords);
  return [...new Set(allKeywords)].sort();
};

/**
 * Obtiene las palabras clave más populares (más frecuentes)
 * @param limit Número máximo de palabras clave a retornar
 * @returns Array de palabras clave ordenadas por frecuencia
 */
export const getMostPopularKeywords = (limit: number = 20): Array<{keyword: string, count: number}> => {
  const keywordCount: { [key: string]: number } = {};
  
  samplePublications.forEach(pub => {
    pub.keywords.forEach(keyword => {
      keywordCount[keyword] = (keywordCount[keyword] || 0) + 1;
    });
  });
  
  return Object.entries(keywordCount)
    .map(([keyword, count]) => ({ keyword, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

/**
 * Obtiene sugerencias de palabras clave basadas en un término de búsqueda
 * @param searchTerm Término de búsqueda
 * @param limit Número máximo de sugerencias
 * @returns Array de sugerencias de palabras clave
 */
export const getKeywordSuggestions = (searchTerm: string, limit: number = 10): string[] => {
  const allKeywords = getAllUniqueKeywords();
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return allKeywords
    .filter(keyword => keyword.toLowerCase().includes(lowerSearchTerm))
    .slice(0, limit);
};

/**
 * Verifica si una publicación coincide con las alertas de palabras clave de un usuario
 * @param publication Publicación a verificar
 * @param userKeywords Array de palabras clave del usuario
 * @returns true si hay coincidencia, false en caso contrario
 */
export const checkPublicationMatchesUserKeywords = (
  publication: SamplePublication,
  userKeywords: string[]
): boolean => {
  if (userKeywords.length === 0) return false;
  
  return userKeywords.some(userKeyword => {
    const lowerUserKeyword = userKeyword.toLowerCase();
    return publication.keywords.some(pubKeyword =>
      pubKeyword.toLowerCase().includes(lowerUserKeyword)
    );
  });
};