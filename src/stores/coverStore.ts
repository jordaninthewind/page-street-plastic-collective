import { create } from "zustand";

import { getCoverInfoFromSupabase } from "@app/services/supabase/supabaseService";
import { type Cover } from "@app/types";

const useCoverStore = create((set) => ({
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

      set({ cover });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCoverStore;
