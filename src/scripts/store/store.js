export let store = {
  // Stores elements for each filter category
  "dataset": { ingredient: [], ustensils: [], appliance: [] },
  // Stores the display state of the top filters
  "filterDisplayStatus": { ingredient: false, ustensils: false, appliance: false },
  "userSelectedFilters": { ingredient: [], ustensils: [], appliance: [] },
  // Stores recipes' data that are relevant for the search function. Text is already normalized
  "recipesData": [],
  "matchingRecipes": [],
  "recipesKeywordsList": []
}

//export const recipesTitlesKeywords = []