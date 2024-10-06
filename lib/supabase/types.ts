export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      payments: {
        Row: {
          additional_info: string | null
          created_at: string | null
          discord: string | null
          email: string
          file_names: string[] | null
          full_name: string
          id: number
          phone: string | null
          service: string
          session_id: string | null
          status: string
        }
        Insert: {
          additional_info?: string | null
          created_at?: string | null
          discord?: string | null
          email: string
          file_names?: string[] | null
          full_name: string
          id?: number
          phone?: string | null
          service: string
          session_id?: string | null
          status: string
        }
        Update: {
          additional_info?: string | null
          created_at?: string | null
          discord?: string | null
          email?: string
          file_names?: string[] | null
          full_name?: string
          id?: number
          phone?: string | null
          service?: string
          session_id?: string | null
          status?: string
        }
        Relationships: []
      }
      todos: {
        Row: {
          company: string | null
          completed: boolean | null
          country: string | null
          created_at: number | null
          date_applied: string
          date_interviewed: string | null
          date_offered: string | null
          date_rejected: string | null
          date_screened: string | null
          description: string | null
          id: number
          kanban_order: number
          location: string | null
          title: string
          todo_level: string
          updated_at: number | null
          user_id: string
        }
        Insert: {
          company?: string | null
          completed?: boolean | null
          country?: string | null
          created_at?: number | null
          date_applied: string
          date_interviewed?: string | null
          date_offered?: string | null
          date_rejected?: string | null
          date_screened?: string | null
          description?: string | null
          id?: number
          kanban_order: number
          location?: string | null
          title: string
          todo_level?: string
          updated_at?: number | null
          user_id: string
        }
        Update: {
          company?: string | null
          completed?: boolean | null
          country?: string | null
          created_at?: number | null
          date_applied?: string
          date_interviewed?: string | null
          date_offered?: string | null
          date_rejected?: string | null
          date_screened?: string | null
          description?: string | null
          id?: number
          kanban_order?: number
          location?: string | null
          title?: string
          todo_level?: string
          updated_at?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "todos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
