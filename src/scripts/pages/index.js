import { Tag } from "../models/Tag.js"
import { createHeader } from "../components/header.js"
import { createSearchBar } from "../components/search-bar.js"
import { createRecipeFilters, createTopFilters, createTopFiltersInputsEvents } from "../components/top-filters.js"
import { Recipe } from "../models/Recipe.js"
import { store } from "../store/store.js"
import { Utils } from "../utils/Utils.js"

export function displayHome(data) {
  const app = document.getElementById("app")
  const main = document.createElement("main")
  createHeader(app)
  app.appendChild(main)
  createSearchBar(main)
  Tag.createActiveFiltersContainer(main)
  createRecipeFilters(main)
  const recipeListContainer = document.createElement("div")
  recipeListContainer.classList = "recipes-list_container"
  main.appendChild(recipeListContainer)
  data.map((recipe) => {
    new Recipe(recipe).displayRecipeCard(recipeListContainer)
    createStoreDataset(recipe)
    //getRecipesKeywords(recipe)
  })
  Utils.sortData(store.dataset)
  createTopFilters()
  createTopFiltersInputsEvents()
  normalizeDatasetValues()
  store.matchingRecipes = [...store.recipesData]
}

// Creates a list of all possible ingredients, appliances and ustensils based on the recipes data
function createStoreDataset(data) {
  for (let entry of [data]) {
    Object.entries(entry).forEach(([key, value]) => {
      // Cf line 67
      if (store.dataset[key] !== undefined)
        if (
          typeof value == "string" &&
          !Object.values(store.dataset[key]).includes(value.toLowerCase()) &&
          // Checks if ingredient already exists even if it was written in singular/plural to avoid duplicates
          !store.dataset[key].includes(value.toLowerCase().slice(0, value.length - 1))
        ) {
          store.dataset[key].push(value.toLowerCase())
        }
      if (typeof value == "object") {
        // Checks :
        // - if passed object is actually an object (eg: nested Ingredient object) => returns undefined
        // - if it is a string encapsuled in an array => returns a length
        if (value.length) {
          for (let array of value) {
            createStoreDataset({ [key]: array })
          }
        }
        createStoreDataset(value)
      }
    })
  }
}

//// In each recipe names, filters out words shorter than 3 letters, then create a sublist of strings for each remaining words.
//function getRecipesKeywords(recipe) {
//  const keywords = recipe.name.split(" ")
//  let recipeKeywords = { id: recipe.id, keywords: [] }
//  const keyword = keywords.map((keyword) => {
//    if (keyword.length >= 3) {
//      recipeKeywords.keywords.push(Utils.formatStringCharacters(keyword))
//    }
//  })
//  recipesTitlesKeywords.push(recipeKeywords)
//}

function normalizeDatasetValues() {
  for (let [key] of Object.entries(store.dataset)) {
    store.dataset[key].forEach((value) => {
      const ingredientIndex = store.dataset[key].indexOf(value)
      store.dataset[key][ingredientIndex] = Utils.formatStringCharacters(value)
    })
  }
}
