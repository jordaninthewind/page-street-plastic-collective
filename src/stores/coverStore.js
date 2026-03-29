import { create } from "zustand";

const useCoverStore = create((set) => ({
  cover: null,
  loading: false,
  error: null,
  success: null,
  info: null,
  warning: null,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSuccess: (success) => set({ success }),
  setInfo: (info) => set({ info }),
  setWarning: (warning) => set({ warning }),
  clearError: () => set({ error: null }),
}));

export default useCoverStore;
