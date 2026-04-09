import { create } from "zustand";

import {
  createCoverRemote,
  getCoversFromSupabase,
  getSingleCoverFromSupabase,
  searchNearbyAddresses,
} from "@app/services";

const useMapStore = create((set, get) => ({
  covers: [],
  searchResults: [],
  searchLoading: false,
  searchError: null,
  loading: false,
  saving: false,
  error: null,

  setSearchLoading: (searchLoading) => set({ searchLoading }),
  setSearchError: (searchError) => set({ searchError }),
  setSearchResults: (searchResults) => set({ searchResults }),
  setSaving: (saving) => set({ saving }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  searchNearbyAddresses: async (lng, lat) => {
    try {
      set({ searchLoading: true, searchError: null });

      const { results, error } = await searchNearbyAddresses(lng, lat);

      if (error) {
        throw error;
      }

      set({ searchResults: results });

      return results;
    } catch (error) {
      set({ searchError: error.message });
    } finally {
      set({ searchLoading: false });
    }
  },

  fetchMapAssets: async () => {
    try {
      set({ loading: true, error: null });

      const data = await getCoversFromSupabase();

      set({ covers: data });
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  addCover: async (data) => {
    try {
      set({ loading: true, error: null });
      await createCoverRemote(data);
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  invalidateMapAssets: () => {
    get().fetchMapAssets();
  },

  invalidateCover: async (id) => {
    try {
      const updatedCover = await getSingleCoverFromSupabase(id);
      if (updatedCover) {
        set((state) => ({
          covers: state.covers.map((cover) =>
            cover.id === id ? updatedCover : cover
          ),
        }));
      }
    } catch (error) {
      console.error("Failed to invalidate cover:", error);
      set({ error: error.message });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useMapStore;
