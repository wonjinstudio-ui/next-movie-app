import { create } from "zustand";
import type { Movie } from "@/types/movie";

type FavoritesStore = {
  favorites: Movie[];
  setFavorites: (update: (prev: Movie[]) => Movie[]) => void;
};

export const useFavoritesStore = create<FavoritesStore>()((set) => ({
  favorites: [],
  setFavorites: (update) =>
    set((state) => ({
      favorites: update(state.favorites),
    })),
}));
