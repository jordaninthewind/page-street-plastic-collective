import { create } from "zustand";

import {
  createCoverRemote,
  getCoversFromSupabase,
  getSingleCoverFromSupabase,
} from "@app/services/supabase/supabaseService";
import { searchNearbyAddresses } from "@app/services/map/mapDataService";

interface MapStore {
  covers: any[];
  searchResults: any[];
  searchLoading: boolean;
  searchError: string | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
}

const useMapStore = create<MapStore>((set, get) => ({
  covers: [],
  searchResults: [],
  searchLoading: false,
  searchError: null,
  loading: false,
  saving: false,
  error: null,

  setSearchLoading: (searchLoading: boolean) => set({ searchLoading }),
  setSearchError: (searchError: string | null) => set({ searchError }),
  setSearchResults: (searchResults: any[]) => set({ searchResults }),
  setSaving: (saving: boolean) => set({ saving }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),

  getCover: (id: string) => get().covers.find((cover: any) => cover.id === id),

  searchNearbyAddresses: async (lng: number, lat: number) => {
    try {
      set({ searchLoading: true, searchError: null });

      const { results, error } = await searchNearbyAddresses(lng, lat);

      if (error) {
        throw error;
      }

      set({ searchResults: results });

      return results;
    } catch (error) {
      set({ searchError: (error as Error).message });
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
      set({ error: (error as Error).message });
      throw error as Error;
    } finally {
      set({ loading: false });
    }
  },

  addCover: async (data: any) => {
    try {
      set({ loading: true, error: null });
      await createCoverRemote(data);
    } catch (error) {
      set({ error: (error as Error).message });
      throw error as Error;
    } finally {
      set({ loading: false });
    }
  },

  invalidateCover: async (id: string) => {
    try {
      const updatedCover = await getSingleCoverFromSupabase(id);

      if (updatedCover) {
        set((state) => ({
          covers: state.covers.map((cover: any) =>
            cover.id === id ? updatedCover : cover
          ),
        }));
      }
    } catch (error) {
      console.error("Failed to invalidate cover:", error);
      set({ error: (error as Error).message });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useMapStore;
