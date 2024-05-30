import { Movies } from "@/store/movies.types";

export const getSelectedIdsString = (array: any) => {
  let selectedIdsString = "";
  let isFirstSelected = true;

  for (const obj of array) {
    if (obj.isSelected && obj.id !== "1") {
      if (!isFirstSelected) {
        selectedIdsString += "|";
      }
      selectedIdsString += obj.id;
      isFirstSelected = false;
    }
  }

  return selectedIdsString;
};

export const getFilteredMovies = (searchText: string, moviesData: Movies) => {
  if (!searchText) return moviesData;
  const filteredData: Movies = {};
  Object.entries(moviesData).forEach(([year, movies]: any) => {
    const filteredMovies = movies.filter((movie: any) =>
      movie.title.toLowerCase().includes(searchText.toLowerCase())
    );
    if (filteredMovies.length > 0) {
      filteredData[year] = filteredMovies;
    }
  });
  return filteredData;
};
