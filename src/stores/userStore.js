import { create } from "zustand";

import {
  logInUserRemote,
  logOutUserRemote,
  signUpUserRemote,
} from "@app/services";

const useUserStore = create((set) => ({
  user: null,
  clearUser: () => set({ user: null }),

  logInUser: async (email, password) => {
    try {
      set({ loading: true });
      const { data, error } = await logInUserRemote(email, password);

      if (error) {
        throw error;
      }

      set({ user: data.user });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  logOutUser: async () => {
    try {
      set({ loading: true });

      const { error } = await logOutUserRemote();

      if (error) {
        throw error;
      }

      set({ user: null });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  signUpUser: async (email, password) => {
    try {
      set({ loading: true });
      const { data, error } = await signUpUserRemote(email, password);
      if (error) {
        throw error;
      }
      set({ user: data.user });
    } catch (error) {
      set({ error: error.message });
    }
  },
}));

export default useUserStore;
