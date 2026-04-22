import { create } from "zustand";

import {
  createCoverRemote,
  getCoversFromSupabase,
  getSingleCoverFromSupabase,
} from "@app/services/supabase/supabaseService";
import { searchNearbyAddresses } from "@app/services/map/mapDataService";
import type { Cover } from "@app/types";

interface SearchResult {
  id: string;
  text: string;
}

interface MapStore {
  covers: Cover[];
  searchResults: SearchResult[];
  searchLoading: boolean;
  searchError: string | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
  setSearchLoading: (searchLoading: boolean) => void;
  setSearchError: (searchError: string | null) => void;
  setSearchResults: (searchResults: SearchResult[]) => void;
  setSaving: (saving: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getCover: (id: string | number) => Cover | undefined;
  searchNearbyAddresses: (lng: number, lat: number) => Promise<SearchResult[] | undefined>;
  fetchMapAssets: () => Promise<void>;
  addCover: (data: unknown) => Promise<void>;
  invalidateCover: (id: string | number) => Promise<void>;
  clearError: () => void;
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
  setSearchResults: (searchResults: SearchResult[]) => set({ searchResults }),
  setSaving: (saving: boolean) => set({ saving }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),

  getCover: (id: string | number) =>
    get().covers.find((cover) => String(cover.id) === String(id)),

  searchNearbyAddresses: async (lng: number, lat: number) => {
    try {
      set({ searchLoading: true, searchError: null });
      const { results, error } = await searchNearbyAddresses(lng, lat);
      if (error) throw new Error(error);
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

  addCover: async (data: unknown) => {
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

  invalidateCover: async (id: string | number) => {
    try {
      const updatedCover = await getSingleCoverFromSupabase(id);
      if (updatedCover) {
        set((state) => ({
          covers: state.covers.map((cover) =>
            String(cover.id) === String(id) ? updatedCover : cover
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
