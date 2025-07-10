export interface SamplePublication {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  location: string;
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
    title: "Necesito 2 personas para tirar una pared",
    description: "Necesito que me ayuden a tirar una pared y recoger los escombrosBicicleta MTB talla M, frenos hidráulicos, suspensión RockShox. Uso recreativo de 6 meses. Perfecta para trails y montaña, muy bien cuidada. Incluye luces LED, computadora de ciclismo y bomba de aire. Ideal para ciclistas intermedios que buscan calidad y rendimiento.",
    price: 200,
    category: "Construcción",
    condition: "Urgente",
    location: "Lorca",
    images: [
      "https://media.istockphoto.com/id/1345113252/es/foto/trabajador-usando-martillo.jpg?s=612x612&w=0&k=20&c=yA7nezIA_ZYUaTu8QhwXaIfRE-qdIYFNoVqciKa64eU=",
      "https://media.istockphoto.com/id/1345113252/es/foto/trabajador-usando-martillo.jpg?s=612x612&w=0&k=20&c=yA7nezIA_ZYUaTu8QhwXaIfRE-qdIYFNoVqciKa64eU="
    ],
    seller: {
      id: "user666",
      name: "Juan Pérez",
      rating: 4.9
    },
    datePosted: "2024-01-16"
  },

];

export const getSamplePublicationById = (id: string): SamplePublication | undefined => {
  return samplePublications.find(pub => pub.id === id);
};