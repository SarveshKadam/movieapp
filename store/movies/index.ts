import { produce } from "immer";
import { create } from "zustand";
import { axiosInstance } from "../../utilities";

const defaultCategory = {
  id: "1",
  name: "All",
  isSelected: true,
};

const initialState = {
  loading: false,
  categories: [defaultCategory],
};

const store = (set: (arg0: any) => void, get: any) => {
  const actions = {
    fetchMovies: async (params: any) => {
      try {
        const { headers } = params;
        const response = await axiosInstance.get("/product", {
          headers,
        });
        set(
          produce((draft: any) => {
            draft.products = response?.data?.products;
          })
        );
      } catch (error) {
        // handle error
      }
    },
    setCategory: (id: string, value: boolean) => {
      if (id === defaultCategory.id) return;
      set(
        produce((draft: any) => {
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
        })
      );
    },
    fetchCategories: async () => {
      try {
        const response = await axiosInstance.get("/genre/movie/list", {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
          },
        });
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
  };
  return {
    ...initialState,
    ...actions,
  };
};

const useMovieStore = create(store);

export default useMovieStore;
