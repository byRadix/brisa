export interface ExternalAd {
  id: string;
  title: string;
  description: string;
  postDate: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    location?: string;
    joinDate: string;
  };
  price?: {
    amount: number;
    currency: string;
    type: 'fixed' | 'hourly' | 'negotiable';
  };
  category: string;
  status: 'active' | 'inactive' | 'pending' | 'expired';
  images: string[];
  media?: {
    type: 'image' | 'video' | 'document';
    url: string;
    caption?: string;
  }[];
  tags: string[];
  location?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  views: number;
  featured: boolean;
  expiryDate?: string;
  rawData: Record<string, any>; // Complete raw data from external database
}

export interface ExternalAdResponse {
  success: boolean;
  data: ExternalAd[];
  total: number;
  page: number;
  limit: number;
  error?: string;
}