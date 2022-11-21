import { createHeader } from "../components/header.js"
import { createSearchBar } from "../components/search-bar.js"
import {
  createRecipeFilters,
  createTopFiltersSuggestions,
  trackTopFilterChevronDirection,
} from "../components/top-filters.js"
import { Recipe } from "../models/Recipe.js"
import { dataset } from "../store/store.js"

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
  console.log(dataset)
  sortStoreDataset()
  createTopFiltersSuggestions()
  cropDescriptions()
  lastRowRecipeList(recipeCards, recipeListContainer)
  trackTopFilterChevronDirection()
}

// Creates an empty and hidden recipe card on the last row of the recipe list when it would display 2 cards, to prevent "justify-content: space between" to add a gap in-between the two recipes.
function lastRowRecipeList(recipeCards, container) {
  if (recipeCards.length % 3 === 2) {
    const hiddenRecipePlaceholder = document.createElement("div")
    hiddenRecipePlaceholder.classList = "recipe-card_container recipe-card_placeholder"
    container.appendChild(hiddenRecipePlaceholder)
  }
}

// Crops descriptions longer than 170 characters, and adds "..." at the end of the description instead
function cropDescriptions() {
  const description = document.querySelectorAll(".recipe-card_description")
  for (let desc of description) {
    if (desc.textContent.length > 170) {
      desc.textContent = `${desc.textContent.slice(0, 170)}...`
    }
  }
}

// Creates a list of all possible ingredients, appliances and ustensils based on the recipes data
const createStoreDataset = (recipe) => {
  Object.entries(recipe).forEach(([key, value]) => {
    if (Object.keys(dataset).includes(key) && !dataset[key].includes(value)) {
      if (typeof value == "string") dataset[key].push(value)
      if (typeof value == "object") {
        let currentCategory = key
        let oldValue = Object.entries(value)
        for (let [key, value] of oldValue) {
          if (value.ingredient) {
            value = value.ingredient
          }
          // Checks if ingredient already exists even if it was written in singular/plural to avoid duplicates
          if (
            typeof value == "string" &&
            !dataset[currentCategory].includes(value) &&
            !dataset.ingredients.includes(value.slice(0, value.length - 1))
          ) {
            dataset[currentCategory].push(value)
          }
        }
      }
    }
  })

  //recipe.ingredients.map((ingredient) => {
  //  if (
  //    !dataset.ingredients.includes(ingredient.ingredient) &&
  //    // Checks if ingredient already exists even if it was written in singular/plural to avoid duplicates
  //    !dataset.ingredients.includes(
  //      ingredient.ingredient.slice(0, ingredient.ingredient.length - 1)
  //    )
  //  )
  //    dataset.ingredients.push(ingredient.ingredient)
  //})
  //if (!dataset.appliances.includes(recipe.appliance)) {
  //  dataset.appliances.push(recipe.appliance)
  //}
  //recipe.ustensils.map((ustensil) => {
  //  if (!dataset.ustensils.includes(ustensil)) dataset.ustensils.push(ustensil)
  //})
}

const sortStoreDataset = () => {
  for (let [key, value] of Object.entries(dataset)) {
    value.sort()
  }
}
