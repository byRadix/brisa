export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string | null
          username: string | null
          avatar_url: string | null
          bio: string | null
          website: string | null
          location: string | null
          skills: string[] | null
          hourly_rate: number | null
          category: string | null
          availability: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          location?: string | null
          skills?: string[] | null
          hourly_rate?: number | null
          category?: string | null
          availability?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          location?: string | null
          skills?: string[] | null
          hourly_rate?: number | null
          category?: string | null
          availability?: string | null
        }
      }
      listings: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string
          category: string
          price: number
          price_type: string
          image_url: string | null
          status: string
          author_id: string
          location: string | null
          contact_info: string | null
          tags: string[] | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description: string
          category: string
          price: number
          price_type: string
          image_url?: string | null
          status?: string
          author_id: string
          location?: string | null
          contact_info?: string | null
          tags?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string
          category?: string
          price?: number
          price_type?: string
          image_url?: string | null
          status?: string
          author_id?: string
          location?: string | null
          contact_info?: string | null
          tags?: string[] | null
        }
      }
      ratings: {
        Row: {
          id: string
          created_at: string
          rating: number
          comment: string | null
          freelancer_id: string
          client_id: string
          listing_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          rating: number
          comment?: string | null
          freelancer_id: string
          client_id: string
          listing_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          rating?: number
          comment?: string | null
          freelancer_id?: string
          client_id?: string
          listing_id?: string | null
        }
      }
      portfolio_items: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string | null
          image_url: string | null
          profile_id: string
          link: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description?: string | null
          image_url?: string | null
          profile_id: string
          link?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string | null
          image_url?: string | null
          profile_id?: string
          link?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}