import { recipes } from "../api/recipes.js"
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
    // In each recipe names, filters out words shorter than 3 letters, then create a sublist of strings for each remaining words.
    // TODO : Créer array pour créer recipeListKeywords à chargement page
    const recipeListKeywords = recipes.map((recipe) => [
      recipe.id,
      Utils.formatStringCharacters(recipe.name),
    ])

    let matchingRecipes = []
    for (let recipeTitle of recipeListKeywords) {
      recipeTitle[1].split(" ").map((substring) => {
        if (substring.length >= 3 && substring.includes(this.userInput)) {
          // Checks if any keyword typed by the user matches a keyword from the recipes titles
          matchingRecipes.push(recipeTitle)
        }
      })
    }
    const recipeCards = document.querySelectorAll(".recipe-card_container")
    recipeCards.forEach((card) => {
      card.setAttribute("data-display-recipe", false)
    })
    matchingRecipes.forEach(([key]) => {
      document.querySelector(`[data-card-id="${key}"]`).setAttribute("data-display-recipe", true)
    })
  }
}
