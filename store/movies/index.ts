import { produce } from "immer";
import { create } from "zustand";
import { axiosInstance } from "../../utilities";
import { getSelectedIdsString } from "@/constants/helpers";
import { Categories, Movies } from "../movies.types";

interface MovieStore {
  loading: boolean;
  categories: Categories[];
  movies: Movies;
  oldestYear: number;
  newestYear: number;
  searchText?: string;
  fetchMovies: (year: number) => void;
  setCategory: (id: string, value: boolean) => void;
  fetchCategories: () => void;
  setOldestYear: (value: number) => void;
  setNewestYear: (value: number) => void;
  setSearchText: (value: string) => void;
}

const defaultCategory = {
  id: "1",
  name: "All",
  isSelected: true,
};

const initialState = {
  loading: false,
  categories: [defaultCategory],
  oldestYear: 2012,
  newestYear: 2012,
  movies: {},
  searchText: "",
};

const store = (set: (arg0: any) => void, get: any) => {
  const actions = {
    fetchMovies: async (year: number) => {
      try {
        const genres = getSelectedIdsString(get().categories);
        const response = await axiosInstance.get("/discover/movie", {
          params: {
            sort_by: "popularity.desc",
            primary_release_year: year,
            page: 1,
            "vote_count.gte": 100,
            with_genres: genres,
          },
        });
        const data = await response.data;
        set(
          produce((draft: any) => {
            draft.movies = { ...get().movies, [year]: data?.results };
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    setCategory: (id: string, value: boolean) => {
      if (id === defaultCategory.id && !value) return;
      set(
        produce((draft: any) => {
          if (id === defaultCategory.id && value) {
            // If all is selected, then deselect other genre
            draft.categories.forEach(
              (element: { id: string; isSelected: boolean }) => {
                if (element.id !== defaultCategory.id) {
                  element.isSelected = false;
                } else {
                  element.isSelected = true;
                }
              }
            );
          } else {
            let isSelectedAvailable = true;
            if (!value) {
              isSelectedAvailable = draft.categories.some(
                (item: { isSelected: any; id: string }) =>
                  item.isSelected && item.id !== id
              );
            }
            draft.categories.forEach(
              (element: { id: string; isSelected: boolean }) => {
                if (value && element.id === defaultCategory.id) {
                  element.isSelected = false;
                }
                if (!isSelectedAvailable && element.id === defaultCategory.id) {
                  element.isSelected = true;
                }
                if (element.id === id) {
                  element.isSelected = value;
                }
              }
            );
          }
        })
      );
      set(
        produce((draft: any) => {
          draft.movies = {};
        })
      );
      for (let year = get().oldestYear; year <= get().newestYear; year++) {
        get().fetchMovies(year);
      }
    },
    fetchCategories: async () => {
      try {
        const response = await axiosInstance.get("/genre/movie/list");
        if (response.data.genres.length) {
          set(
            produce((draft: any) => {
              draft.categories = [
                defaultCategory,
                ...response.data.genres.map((item: any) => ({
                  ...item,
                  isSelected: false,
                })),
              ];
            })
          );
        }
      } catch (error) {
        // handle errors
      }
    },
    setOldestYear: (value: number) => {
      set(
        produce((draft: any) => {
          draft.oldestYear = value;
        })
      );
    },
    setNewestYear: (value: number) => {
      set(
        produce((draft: any) => {
          draft.newestYear = value;
        })
      );
    },
    setSearchText: (value: string) => {
      set(
        produce((draft: any) => {
          draft.searchText = value;
        })
      );
    },
  };
  return {
    ...initialState,
    ...actions,
  };
};

const useMovieStore = create<MovieStore>(store);

export default useMovieStore;
