import { create } from "zustand";

export const useUsersStore = create((set) => ({
  users: [],
  setUsers: (data) => set(() => ({ users: [...data] })),
}));
