import { createHeader } from "../components/header.js"
import { createSearchBar } from "../components/search-bar.js"
import { createRecipeFilters } from "../components/top-filters.js"
import { Recipe } from "../models/Recipe.js"

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
  const recipeCards = data.map((recipe) => new Recipe(recipe).displayRecipeCard(recipeListContainer))
  lastRowRecipeList(recipeCards, recipeListContainer)
}

// Creates an empty and hidden recipe card on the last row of the recipe list when it would display 2 cards, to prevent "justify-content: space between" to add a gap in-between the two recipes.
function lastRowRecipeList(recipeCards, container) {
  if (recipeCards.length%3 === 2) {
  const hiddenRecipePlaceholder = document.createElement("div")
  hiddenRecipePlaceholder.classList = "recipe-card_container recipe-card_placeholder"
  container.appendChild(hiddenRecipePlaceholder)
}
}