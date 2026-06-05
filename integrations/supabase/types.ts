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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      imposter_lobbies: {
        Row: {
          categories: string[]
          code: string
          created_at: string
          hint: string | null
          hint_enabled: boolean
          host_player_id: string | null
          id: string
          imposter_player_id: string | null
          starter_player_id: string | null
          status: string
          updated_at: string
          word: string | null
        }
        Insert: {
          categories?: string[]
          code: string
          created_at?: string
          hint?: string | null
          hint_enabled?: boolean
          host_player_id?: string | null
          id?: string
          imposter_player_id?: string | null
          starter_player_id?: string | null
          status?: string
          updated_at?: string
          word?: string | null
        }
        Update: {
          categories?: string[]
          code?: string
          created_at?: string
          hint?: string | null
          hint_enabled?: boolean
          host_player_id?: string | null
          id?: string
          imposter_player_id?: string | null
          starter_player_id?: string | null
          status?: string
          updated_at?: string
          word?: string | null
        }
        Relationships: []
      }
      imposter_players: {
        Row: {
          id: string
          is_host: boolean
          joined_at: string
          lobby_id: string
          name: string
        }
        Insert: {
          id?: string
          is_host?: boolean
          joined_at?: string
          lobby_id: string
          name: string
        }
        Update: {
          id?: string
          is_host?: boolean
          joined_at?: string
          lobby_id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "imposter_players_lobby_id_fkey"
            columns: ["lobby_id"]
            isOneToOne: false
            referencedRelation: "imposter_lobbies"
            referencedColumns: ["id"]
          },
        ]
      }
      poker_lobbies: {
        Row: {
          big_blind: number
          button_seat: number
          code: string
          community: Json
          created_at: string
          deck: Json
          hand_number: number
          id: string
          pot: number
          small_blind: number
          starting_chips: number
          status: string
          updated_at: string
          use_chips: boolean
        }
        Insert: {
          big_blind?: number
          button_seat?: number
          code: string
          community?: Json
          created_at?: string
          deck?: Json
          hand_number?: number
          id?: string
          pot?: number
          small_blind?: number
          starting_chips?: number
          status?: string
          updated_at?: string
          use_chips?: boolean
        }
        Update: {
          big_blind?: number
          button_seat?: number
          code?: string
          community?: Json
          created_at?: string
          deck?: Json
          hand_number?: number
          id?: string
          pot?: number
          small_blind?: number
          starting_chips?: number
          status?: string
          updated_at?: string
          use_chips?: boolean
        }
        Relationships: []
      }
      poker_players: {
        Row: {
          chips: number
          current_bet: number
          folded: boolean
          hole_cards: Json
          id: string
          is_host: boolean
          joined_at: string
          lobby_id: string
          name: string
          seat: number
        }
        Insert: {
          chips?: number
          current_bet?: number
          folded?: boolean
          hole_cards?: Json
          id?: string
          is_host?: boolean
          joined_at?: string
          lobby_id: string
          name: string
          seat?: number
        }
        Update: {
          chips?: number
          current_bet?: number
          folded?: boolean
          hole_cards?: Json
          id?: string
          is_host?: boolean
          joined_at?: string
          lobby_id?: string
          name?: string
          seat?: number
        }
        Relationships: [
          {
            foreignKeyName: "poker_players_lobby_id_fkey"
            columns: ["lobby_id"]
            isOneToOne: false
            referencedRelation: "poker_lobbies"
            referencedColumns: ["id"]
          },
        ]
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
    Enums: {},
  },
} as const
