import { getCoverInfoFromSupabase } from "@app/services";
import { create } from "zustand";

const useCoverStore = create((set) => ({
  cover: null,
  events: null,
  comments: null,
  loading: false,
  error: null,
  success: null,
  info: null,
  warning: null,
  setCover: (cover) => set({ cover }),
  setEvents: (events) => set({ events }),
  setComments: (comments) => set({ comments }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSuccess: (success) => set({ success }),
  setInfo: (info) => set({ info }),
  setWarning: (warning) => set({ warning }),
  clearError: () => set({ error: null }),
  fetchCover: async (id) => {
    try {
      set({ loading: true, error: null });

      const { cover, events, comments } = await getCoverInfoFromSupabase(id);

      set({ cover, events, comments });
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCoverStore;
