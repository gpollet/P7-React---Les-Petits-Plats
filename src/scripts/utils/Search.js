import { recipes } from "../api/recipes.js"
import { recipesTitlesKeywords } from "../store/store.js"
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
    matchingRecipes.forEach((recipe) => {
      document.querySelector(`[data-card-id="${recipe.id}"]`).setAttribute("data-display-recipe", true)
    })
  }
}
