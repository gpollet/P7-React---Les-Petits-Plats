import { recipes } from "../api/recipes.js"
import { dataset, recipesTitlesKeywords } from "../store/store.js"
import { Utils } from "./Utils.js"

export class Search {
  constructor(value) {
    this.userInput = Utils.formatStringCharacters(value)
  }
  
  getKeywordsFromInput() {
    // Creates a new string to search for, for each word separated by a " " in user's input
    const keywords = this.userInput.split(" ")
    for (let keyword of keywords) {
      this.searchMatchingTitles(keyword)
    }
  }

  searchMatchingTitles() {
    const matchingRecipes = recipesTitlesKeywords.filter((recipe) =>
      recipe.keywords.find((el) => el.includes(this.userInput))
    )
    const recipeCards = document.querySelectorAll(".recipe-card_container")
    recipeCards.forEach((card) => {
      card.setAttribute("data-display-recipe", false)
    })
    // Sets visibility of top filters to false, then if filter matches user input, set it to true
    this.manageAllTopFilters()
    matchingRecipes.forEach((recipe) => {
      document
        .querySelector(`[data-card-id="${recipe.id}"]`)
        .setAttribute("data-display-recipe", true)
      this.searchMatchingIngredients(recipe.id)
    })
  }

  manageAllTopFilters() {
    const ingredientTopFilterListElements = document.querySelector(
      "[data-filter-list-category='ingredient']"
    ).children
    for (let element of ingredientTopFilterListElements) {
      if (this.userInput.length < 3) {
        element.setAttribute("data-filter-visible", true)  
      } else {
        element.setAttribute("data-filter-visible", false)
      }
    }
  }

  searchMatchingIngredients(matchingRecipeId) {
    if (matchingRecipeId) {
      let matchingRecipeData = recipes.find((recipe) => recipe.id == matchingRecipeId)
      const matchingRecipeIngredients = matchingRecipeData.ingredients.map((ingredient) =>
        Utils.formatStringCharacters(ingredient.ingredient)
      )
      const ingredientTopFilterListElements = document.querySelector(
        "[data-filter-list-category='ingredient']"
      ).children
      for (let element of ingredientTopFilterListElements) {
        if (matchingRecipeIngredients.includes(Utils.formatStringCharacters(element.textContent)))
          element.setAttribute("data-filter-visible", true)
      }
    }
  }
}
