import { createHeader } from "../components/header.js"
import { createSearchBar } from "../components/search-bar.js"
import {
  createRecipeFilters,
  createTopFilters,
} from "../components/top-filters.js"
import { Recipe } from "../models/Recipe.js"
import { dataset } from "../store/store.js"
import { Utils } from "../utils/Utils.js"

export function displayHome(data) {
  const app = document.getElementById("app")
  const main = document.createElement("main")
  createHeader(app)
  app.appendChild(main)
  createSearchBar(main)
  createRecipeFilters(main)
  const recipeListContainer = document.createElement("div")
  recipeListContainer.classList = "recipes-list_container"
  main.appendChild(recipeListContainer)
  const recipeCards = data.map((recipe) => {
    new Recipe(recipe).displayRecipeCard(recipeListContainer)
    createStoreDataset(recipe)
  })
  Utils.sortData(dataset)
  createTopFilters()
  lastRowRecipeList(recipeCards, recipeListContainer)
}

// Creates an empty and hidden recipe card on the last row of the recipe list when it would display 2 cards, to prevent "justify-content: space between" to add a gap in-between the two recipes.
function lastRowRecipeList(recipeCards, container) {
  if (recipeCards.length % 3 === 2) {
    const hiddenRecipePlaceholder = document.createElement("div")
    hiddenRecipePlaceholder.classList = "recipe-card_container recipe-card_placeholder"
    container.appendChild(hiddenRecipePlaceholder)
  }
}

// Creates a list of all possible ingredients, appliances and ustensils based on the recipes data
function createStoreDataset(data) {
  for (let entry of [data]) {
    Object.entries(entry).forEach(([key, value]) => {
      // Cf line 67
      if (dataset[key] !== undefined)
        if (
          typeof value == "string" &&
          !Object.values(dataset[key]).includes(value.toLowerCase()) &&
          // Checks if ingredient already exists even if it was written in singular/plural to avoid duplicates
          !dataset[key].includes(value.toLowerCase().slice(0, value.length - 1))
        ) {
          dataset[key].push(value.toLowerCase())
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
