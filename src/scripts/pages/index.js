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
  data.map((recipe) => new Recipe(recipe).displayRecipeCard(main))
}