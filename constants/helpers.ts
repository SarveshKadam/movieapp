import { Categories, Movie, Movies } from "@/store/movies.types";

export const getSelectedIdsString = (array: Categories[]) => {
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
  Object.entries(moviesData).forEach(([year, movies]) => {
    const filteredMovies = movies.filter((movie: Movie) =>
      movie.title.toLowerCase().includes(searchText.toLowerCase())
    );
    if (filteredMovies.length > 0) {
      filteredData[year] = filteredMovies;
    }
  });
  return filteredData;
};
