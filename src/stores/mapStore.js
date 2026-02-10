import { create } from "zustand";

import {
  addMarkerToMapRemote,
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
  setMarkers: (markers) => set({ markers }),

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

  fetchMarkers: async () => {
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

  addMarker: async (markerData) => {
    try {
      set({ loading: true, error: null });
      await addMarkerToMapRemote(markerData);
      get().fetchMarkers();
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  invalidateMarkers: async () => {
    await get().fetchMarkers();
  },

  invalidateMarker: async (id) => {
    try {
      const updatedMarker = await getSingleCoverFromSupabase(id);
      if (updatedMarker) {
        set((state) => ({
          markers: state.markers.map((marker) =>
            marker.id === id ? updatedMarker : marker
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
