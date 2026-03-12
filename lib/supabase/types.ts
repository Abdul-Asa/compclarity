export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.0.2 (a4e00ff)";
  };
  public: {
    Tables: {
      applications: {
        Row: {
          company: string | null;
          completed: boolean | null;
          created_at: string;
          date_applied: string;
          date_interviewed: string | null;
          date_offered: string | null;
          date_rejected: string | null;
          date_screened: string | null;
          description: string | null;
          id: number;
          kanban_order: number;
          location: string | null;
          notifications: boolean;
          title: string;
          todo_level: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          company?: string | null;
          completed?: boolean | null;
          created_at?: string;
          date_applied: string;
          date_interviewed?: string | null;
          date_offered?: string | null;
          date_rejected?: string | null;
          date_screened?: string | null;
          description?: string | null;
          id?: number;
          kanban_order: number;
          location?: string | null;
          notifications?: boolean;
          title: string;
          todo_level?: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          company?: string | null;
          completed?: boolean | null;
          created_at?: string;
          date_applied?: string;
          date_interviewed?: string | null;
          date_offered?: string | null;
          date_rejected?: string | null;
          date_screened?: string | null;
          description?: string | null;
          id?: number;
          kanban_order?: number;
          location?: string | null;
          notifications?: boolean;
          title?: string;
          todo_level?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "applications_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      cvs: {
        Row: {
          created_at: string;
          cv_data: Json;
          id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          cv_data: Json;
          id?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          cv_data?: Json;
          id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_user";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      offer_reports: {
        Row: {
          company: string;
          created_at: string;
          details: string | null;
          email: string | null;
          id: number;
          job_title: string;
          offer_row_id: string;
          reason: string;
          type: Database["public"]["Enums"]["offer_report_type"];
        };
        Insert: {
          company: string;
          created_at?: string;
          details?: string | null;
          email?: string | null;
          id?: number;
          job_title: string;
          offer_row_id: string;
          reason: string;
          type?: Database["public"]["Enums"]["offer_report_type"];
        };
        Update: {
          company?: string;
          created_at?: string;
          details?: string | null;
          email?: string | null;
          id?: number;
          job_title?: string;
          offer_row_id?: string;
          reason?: string;
          type?: Database["public"]["Enums"]["offer_report_type"];
        };
        Relationships: [];
      };
      offer_uploads: {
        Row: {
          company: string;
          created_at: string;
          discord: string | null;
          education: string;
          ethnicity: string;
          file_urls: string[];
          gender: string;
          id: string;
          office_location: string;
          yoe: number;
        };
        Insert: {
          company: string;
          created_at?: string;
          discord?: string | null;
          education: string;
          ethnicity: string;
          file_urls: string[];
          gender: string;
          id?: string;
          office_location: string;
          yoe: number;
        };
        Update: {
          company?: string;
          created_at?: string;
          discord?: string | null;
          education?: string;
          ethnicity?: string;
          file_urls?: string[];
          gender?: string;
          id?: string;
          office_location?: string;
          yoe?: number;
        };
        Relationships: [];
      };
      payments: {
        Row: {
          additional_info: string | null;
          created_at: string | null;
          discord: string | null;
          email: string;
          file_names: string[] | null;
          full_name: string;
          id: number;
          phone: string | null;
          service: string;
          session_id: string | null;
          status: string;
        };
        Insert: {
          additional_info?: string | null;
          created_at?: string | null;
          discord?: string | null;
          email: string;
          file_names?: string[] | null;
          full_name: string;
          id?: number;
          phone?: string | null;
          service: string;
          session_id?: string | null;
          status: string;
        };
        Update: {
          additional_info?: string | null;
          created_at?: string | null;
          discord?: string | null;
          email?: string;
          file_names?: string[] | null;
          full_name?: string;
          id?: number;
          phone?: string | null;
          service?: string;
          session_id?: string | null;
          status?: string;
        };
        Relationships: [];
      };
      todos: {
        Row: {
          company: string | null;
          completed: boolean | null;
          country: string | null;
          created_at: number | null;
          date_applied: string;
          date_interviewed: string | null;
          date_offered: string | null;
          date_rejected: string | null;
          date_screened: string | null;
          description: string | null;
          id: number;
          kanban_order: number;
          location: string | null;
          title: string;
          todo_level: string;
          updated_at: number | null;
          user_id: string;
        };
        Insert: {
          company?: string | null;
          completed?: boolean | null;
          country?: string | null;
          created_at?: number | null;
          date_applied: string;
          date_interviewed?: string | null;
          date_offered?: string | null;
          date_rejected?: string | null;
          date_screened?: string | null;
          description?: string | null;
          id?: number;
          kanban_order: number;
          location?: string | null;
          title: string;
          todo_level?: string;
          updated_at?: number | null;
          user_id: string;
        };
        Update: {
          company?: string | null;
          completed?: boolean | null;
          country?: string | null;
          created_at?: number | null;
          date_applied?: string;
          date_interviewed?: string | null;
          date_offered?: string | null;
          date_rejected?: string | null;
          date_screened?: string | null;
          description?: string | null;
          id?: number;
          kanban_order?: number;
          location?: string | null;
          title?: string;
          todo_level?: string;
          updated_at?: number | null;
          user_id?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          created_at: string | null;
          email: string;
          first_name: string;
          id: string;
          is_subscribed: boolean;
          last_name: string;
          phonenumber: string | null;
          stripe_customer_id: string | null;
          tokens: number;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          first_name: string;
          id: string;
          is_subscribed?: boolean;
          last_name: string;
          phonenumber?: string | null;
          stripe_customer_id?: string | null;
          tokens?: number;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          first_name?: string;
          id?: string;
          is_subscribed?: boolean;
          last_name?: string;
          phonenumber?: string | null;
          stripe_customer_id?: string | null;
          tokens?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      reset_tokens: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
    };
    Enums: {
      offer_report_type: "offer" | "job_listing";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      offer_report_type: ["offer", "job_listing"],
    },
  },
} as const;
