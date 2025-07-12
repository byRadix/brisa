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
    title: "iPhone 13 Pro Max - 256GB",
    description: "Smartphone Apple en excelente estado, incluye cargador original y caja. Color Grafito, batería al 92% de salud. Perfecto para uso diario, sin rayones ni golpes. Siempre ha tenido protector de pantalla y funda. Ideal para quien busca un iPhone premium a precio accesible.",
    price: 899.99,
    category: "Electrónicos",
    condition: "Usado - Como nuevo",
    location: "Ciudad de México",
    coordinates: {
      latitude: 19.4326,
      longitude: -99.1332
    },
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
    id: "pub002", 
    title: "Bicicleta de Montaña Trek Marlin 7",
    description: "Bicicleta MTB talla M, frenos hidráulicos, suspensión RockShox. Uso recreativo de 6 meses. Perfecta para trails y montaña, muy bien cuidada. Incluye luces LED, computadora de ciclismo y bomba de aire. Ideal para ciclistas intermedios que buscan calidad y rendimiento.",
    price: 649.99,
    category: "Deportes",
    condition: "Usado - Buen estado",
    location: "Guadalajara",
    coordinates: {
      latitude: 20.6597,
      longitude: -103.3496
    },
    images: [
      "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    seller: {
      id: "user456",
      name: "Ana García",
      rating: 4.9
    },
    datePosted: "2024-01-14"
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

];

export const getSamplePublicationById = (id: string): SamplePublication | undefined => {
  return samplePublications.find(pub => pub.id === id);
};