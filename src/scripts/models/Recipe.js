import {
  createIngredientsList,
  createRecipeCard,
} from "../components/recipe-card.js"

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
    const cardContainer = document.createElement("a")
    cardContainer.href = "#"
    cardContainer.classList = "recipe-card_container"
    cardContainer.ariaLabel = this.name
    cardContainer.setAttribute("data-card-id", this.id)
    cardContainer.setAttribute("tabindex", "0")
    createRecipeCard(cardContainer, this, this.getMediaFilename())
    container.appendChild(cardContainer)
    this.ingredients.map((ingredient) =>
      createIngredientsList(this.id, ingredient)
    )
  }

  getMediaFilename() {
    return this.name
      .toLowerCase()
      .replace(/[ ]/g, "-")
      .replace(/[,]/g, "")
      .replace(/[éèêë]/g, "e")
      .replace(/[àâä]/g, "a")
  }
}
