export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      post_types: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          key: string
          label: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          key: string
          label: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          key?: string
          label?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          active_reserve: boolean | null
          connection: Database["public"]["Enums"]["connection"] | null
          discharge_date: string | null
          email: string
          hamal_unit: string | null
          is_admin: boolean
          is_newsletter: boolean
          phone_number: string
          recruit_date: string | null
          release_rank: string | null
          sector: string | null
          status: Database["public"]["Enums"]["status"]
          uid: string
          username: string | null
        }
        Insert: {
          active_reserve?: boolean | null
          connection?: Database["public"]["Enums"]["connection"] | null
          discharge_date?: string | null
          email: string
          hamal_unit?: string | null
          is_admin?: boolean
          is_newsletter?: boolean
          phone_number: string
          recruit_date?: string | null
          release_rank?: string | null
          sector?: string | null
          status: Database["public"]["Enums"]["status"]
          uid: string
          username?: string | null
        }
        Update: {
          active_reserve?: boolean | null
          connection?: Database["public"]["Enums"]["connection"] | null
          discharge_date?: string | null
          email?: string
          hamal_unit?: string | null
          is_admin?: boolean
          is_newsletter?: boolean
          phone_number?: string
          recruit_date?: string | null
          release_rank?: string | null
          sector?: string | null
          status?: Database["public"]["Enums"]["status"]
          uid?: string
          username?: string | null
        }
        Relationships: []
      }
      tazpi_comments: {
        Row: {
          comment_id: string
          content: string
          created_at: string
          post_id: string
          user_id: string
        }
        Insert: {
          comment_id?: string
          content: string
          created_at?: string
          post_id: string
          user_id: string
        }
        Update: {
          comment_id?: string
          content?: string
          created_at?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tazpi_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "tazpi_posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "tazpi_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["uid"]
          },
        ]
      }
      tazpi_events: {
        Row: {
          created_at: string | null
          description: string | null
          event_date: string | null
          event_id: number
          location: string
          max_participants: number | null
          title: string
          whatsapp_link: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_date?: string | null
          event_id?: number
          location: string
          max_participants?: number | null
          title: string
          whatsapp_link?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_date?: string | null
          event_id?: number
          location?: string
          max_participants?: number | null
          title?: string
          whatsapp_link?: string | null
        }
        Relationships: []
      }
      tazpi_likes: {
        Row: {
          created_at: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tazpi_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "tazpi_posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "tazpi_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["uid"]
          },
        ]
      }
      tazpi_post_audiences: {
        Row: {
          created_at: string | null
          post_id: string
          target_audience: Database["public"]["Enums"]["target_audience"]
        }
        Insert: {
          created_at?: string | null
          post_id: string
          target_audience: Database["public"]["Enums"]["target_audience"]
        }
        Update: {
          created_at?: string | null
          post_id?: string
          target_audience?: Database["public"]["Enums"]["target_audience"]
        }
        Relationships: [
          {
            foreignKeyName: "tazpi_post_audiences_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "tazpi_posts"
            referencedColumns: ["post_id"]
          },
        ]
      }
      tazpi_posts: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          content: string
          created_at: string
          image_url: string | null
          post_id: string
          post_type_id: string | null
          status: Database["public"]["Enums"]["post_status"] | null
          tags: string | null
          title: string
          user_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          content: string
          created_at?: string
          image_url?: string | null
          post_id?: string
          post_type_id?: string | null
          status?: Database["public"]["Enums"]["post_status"] | null
          tags?: string | null
          title: string
          user_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          content?: string
          created_at?: string
          image_url?: string | null
          post_id?: string
          post_type_id?: string | null
          status?: Database["public"]["Enums"]["post_status"] | null
          tags?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tazpi_posts_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "tazpi_posts_post_type_id_fkey"
            columns: ["post_type_id"]
            isOneToOne: false
            referencedRelation: "post_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tazpi_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["uid"]
          },
        ]
      }
      tazpi_tips: {
        Row: {
          description: string | null
          id: string
          title: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          title?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          title?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      connection:
        | "parent"
        | "grandparent"
        | "partner"
        | "combat soldier"
        | "other"
      post_status: "pending" | "approved" | "declined"
      status: "recruit" | "serving" | "released" | "other"
      target_audience: "pre_service" | "soldiers" | "discharged"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      connection: [
        "parent",
        "grandparent",
        "partner",
        "combat soldier",
        "other",
      ],
      post_status: ["pending", "approved", "declined"],
      status: ["recruit", "serving", "released", "other"],
      target_audience: ["pre_service", "soldiers", "discharged"],
    },
  },
} as const
