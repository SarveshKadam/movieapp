export const categories: { label: string; id: string }[] = [
  { label: "All", id: "all" },
  { label: "Action", id: "action" },
  { label: "Comedy", id: "comedy" },
  { label: "Horror", id: "horror" },
  { label: "Drama", id: "drama" },
  { label: "Sci-Fi", id: "sci-fi" },
];

export const getFullYear = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  return date.getFullYear();
};
