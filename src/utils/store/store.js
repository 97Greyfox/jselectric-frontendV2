import { create } from "zustand";
import { persist } from "zustand/middleware";
const useStore = create(
  persist(
    (set) => ({
      user: null,
      laborRefresh: false,
      storeUser: (newUser) => set({ user: newUser }),
      laborRefreshHandle: (flag) => set({ laborRefresh: !flag }),
    }),
    {
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
export default useStore;
