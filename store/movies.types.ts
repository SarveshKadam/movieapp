export interface Movie {
  id: number;
  title: string;
  release_date: number;
  poster_path: string;
}

export interface Movies {
  [year: number | string]: Movie[];
}

export interface Categories {
  id: string;
  name: string;
  isSelected: boolean;
}
