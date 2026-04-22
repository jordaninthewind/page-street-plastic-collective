import { create } from "zustand";
import { type AuthChangeEvent, type Session } from "@supabase/supabase-js";

import {
  logInUserRemote,
  logOutUserRemote,
  signUpUserRemote,
  supabase,
} from "@app/services/supabase/supabaseService";
import { type User } from "@app/types";

interface UserStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  clearUser: () => void;
  logInUser: (email: string, password: string) => Promise<void>;
  logOutUser: () => Promise<void>;
  signUpUser: (email: string, firstName: string, lastName: string, phone: string) => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  error: null,
  clearUser: () => set({ user: null }),

  logInUser: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const data = await logInUserRemote(email, password);
      set({ user: data.user as unknown as User | null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  logOutUser: async () => {
    try {
      set({ loading: true, error: null });
      await logOutUserRemote();
      set({ user: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  signUpUser: async (email: string, firstName: string, lastName: string, phone: string) => {
    try {
      set({ loading: true, error: null });
      const data = await signUpUserRemote(email, firstName, lastName, phone);
      set({ user: data.user as unknown as User | null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));

supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
  useUserStore.setState({ user: session?.user as unknown as User | null });
});

export default useUserStore;
