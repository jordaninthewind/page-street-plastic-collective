import { create } from "zustand";

import {
  logInUserRemote,
  logOutUserRemote,
  signUpUserRemote,
} from "@app/services";

const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  clearUser: () => set({ user: null }),

  logInUser: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const data = await logInUserRemote(email, password);
      set({ user: data.user });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  logOutUser: async () => {
    try {
      set({ loading: true, error: null });
      await logOutUserRemote();
      set({ user: null });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  signUpUser: async (email, password, name) => {
    try {
      set({ loading: true, error: null });
      const data = await signUpUserRemote(email, password, name);
      set({ user: data.user });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUserStore;
