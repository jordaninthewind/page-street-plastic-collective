declare module "@app/services/supabase/supabaseService" {
  import type { AuthResponse, Session, SupabaseClient, User } from "@supabase/supabase-js";

  export const supabase: SupabaseClient;

  export function signUpUserRemote(
    email: string,
    firstName: string,
    lastName: string,
    phone: string
  ): Promise<AuthResponse["data"]>;

  export function logInUserWithOtpRemote(phone: string): Promise<AuthResponse["data"]>;

  export function logInUserRemote(email: string, password: string): Promise<AuthResponse["data"]>;

  export function logOutUserRemote(): Promise<boolean>;

  export function getSingleCoverFromSupabase(id: string): Promise<unknown>;
  export function getCommentsFromSupabase(id: string): Promise<unknown[]>;
  export function addCommentToSupabase(comment: unknown): Promise<void>;
  export function updateCoverStateInSupabase(input: { id: string; covered: boolean }): Promise<void>;
  export function getCoversFromSupabase(): Promise<unknown[]>;
  export function createCoverRemote(fields: unknown): Promise<void>;
  export function updateCoverRemote(input: { id: string; state: unknown }): Promise<void>;
  export function getEventsFromSupabase(id: string): Promise<unknown[]>;
  export function getCoverInfoFromSupabase(id: string): Promise<{ cover: unknown; events: unknown[]; comments: unknown[] }>;
  export function recordEventInSupabase(input: { event: unknown }): Promise<void>;

  export type SupabaseSession = Session | null;
  export type SupabaseUser = User | null;
}
