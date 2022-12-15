// Stores elements for each filter category
export let dataset = { ingredient: [], ustensils: [], appliance: [] }

// Stores the display state of the top filters
export let filterDisplayStatus = { ingredient: false, ustensils: false, appliance: false }

export let userSelectedFilters = { ingredient: [], ustensils: [], appliance: [] }

// Stores recipes' data that are relevant for the search function. Text is already normalized
export const recipesData = []
export const matchingRecipes = []


//export const recipesTitlesKeywords = []