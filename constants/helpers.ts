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
