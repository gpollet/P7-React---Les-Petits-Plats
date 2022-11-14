import { createIngredientsList, createRecipeCard } from "../components/recipe-card.js"
import { Ingredient } from "./Ingredient.js"

export class Recipe {
  constructor(recipe) {
    this.id = recipe.id
    this.name = recipe.name
    this.servings = recipe.servings
    this.ingredients = recipe.ingredients
    this.time = recipe.time
    this.description = recipe.description
    this.appliance = recipe.appliance
    this.ustensils = recipe.ustensils
  }

  displayRecipeCard(container) {
    const cardContainer = document.createElement("div")
    createRecipeCard(cardContainer, this)
    container.appendChild(cardContainer)
    const recipeIngredients = this.ingredients.map((ingredient) => new Ingredient(ingredient))
    createIngredientsList(this.id, recipeIngredients)
  }
}
