import { createHeader } from "../components/header.js"
import { createSearchBar } from "../components/search-bar.js"
import { createRecipeFilters } from "../components/top-filters.js"
import { Recipe } from "../models/Recipe.js"
import { chevronDownIcon, chevronUpIcon } from "../store/store.js"

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
  const recipeCards = data.map((recipe) =>
    new Recipe(recipe).displayRecipeCard(recipeListContainer)
  )
  cropDescriptions()
  lastRowRecipeList(recipeCards, recipeListContainer)
  trackTopFilterChevronDirection()
}

// Creates an empty and hidden recipe card on the last row of the recipe list when it would display 2 cards, to prevent "justify-content: space between" to add a gap in-between the two recipes.
function lastRowRecipeList(recipeCards, container) {
  if (recipeCards.length % 3 === 2) {
    const hiddenRecipePlaceholder = document.createElement("div")
    hiddenRecipePlaceholder.classList =
      "recipe-card_container recipe-card_placeholder"
    container.appendChild(hiddenRecipePlaceholder)
  }
}

// Change the top-filters chevron icon direction on focus in/out
function trackTopFilterChevronDirection() {
  const chevronContainer = document.querySelectorAll(
    ".top-filters_container label"
  )
  for (let topFilter of chevronContainer) {
    const inputField = topFilter.firstElementChild
    inputField.addEventListener(
      "focusin",
      () => (inputField.nextElementSibling.outerHTML = chevronUpIcon)
    )
    inputField.addEventListener(
      "focusout",
      () => (inputField.nextElementSibling.outerHTML = chevronDownIcon)
    )
  }
}

// Crops descriptions longer than 175 characters, and adds "..." at the end of the description instead
function cropDescriptions() {
  const description = document.querySelectorAll(".recipe-card_description")
  for (let desc of description) {
    if (desc.textContent.length > 175) {
      desc.textContent = `${desc.textContent.slice(0, 175)}...`
    }
  }
}
