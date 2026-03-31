import { create } from "zustand";

import {
  addCoverToMapRemote,
  getCoversFromSupabase,
  getSingleCoverFromSupabase,
  searchNearbyAddresses,
} from "@app/services";

const useMapStore = create((set, get) => ({
  markers: [],
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
  setCovers: (markers) => set({ markers }),

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

  fetchCovers: async () => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await getCoversFromSupabase();

      if (error) {
        throw error;
      }

      set({ markers: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addCover: async (markerData) => {
    try {
      set({ loading: true, error: null });
      await addCoverToMapRemote(markerData);
      get().fetchCovers();
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  invalidateCovers: async () => {
    await get().fetchCovers();
  },

  invalidateCover: async (id) => {
    try {
      const updatedCover = await getSingleCoverFromSupabase(id);
      if (updatedCover) {
        set((state) => ({
          markers: state.markers.map((marker) =>
            marker.id === id ? updatedCover : marker
          ),
        }));
      }
    } catch (error) {
      console.error("Failed to invalidate marker:", error);
      set({ error: error.message });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useMapStore;
