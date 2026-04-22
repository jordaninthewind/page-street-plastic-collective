import { create } from "zustand";

import { getCoverInfoFromSupabase } from "@app/services/supabase/supabaseService";
import type { Cover } from "@app/types";

interface CoverStore {
  cover: Cover | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  info: string | null;
  warning: string | null;
  setCover: (cover: Cover) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
  setInfo: (info: string | null) => void;
  setWarning: (warning: string | null) => void;
  clearError: () => void;
  fetchCover: (id: string) => Promise<void>;
}

const useCoverStore = create<CoverStore>((set) => ({
  cover: null,
  loading: false,
  error: null,
  success: null,
  info: null,
  warning: null,
  setCover: (cover: Cover) => set({ cover }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  setSuccess: (success: string | null) => set({ success }),
  setInfo: (info: string | null) => set({ info }),
  setWarning: (warning: string | null) => set({ warning }),
  clearError: () => set({ error: null }),
  fetchCover: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const cover = await getCoverInfoFromSupabase(id);
      set({ cover: cover ?? null });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCoverStore;
