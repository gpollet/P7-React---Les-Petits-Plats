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
      this.searchMatchingTopFilters(recipe.id)
    })
  }

  manageAllTopFilters(matchingElement) {
    const topFiltersLists = document.querySelectorAll(".top-filters_suggestions-list")
    for (let topFilter of topFiltersLists) {
      topFilter = topFilter.children
      for (let element of topFilter) {
        if (this.userInput.length < 3 || matchingElement) {
          matchingElement
            ? matchingElement.setAttribute("data-filter-visible", true)
            : element.setAttribute("data-filter-visible", true)
        } else {
          element.setAttribute("data-filter-visible", false)
        }
      }
    }
  }

  searchMatchingTopFilters(matchingRecipeId) {
    if (matchingRecipeId) {
      const matchingRecipeData = recipes.find((recipe) => recipe.id == matchingRecipeId)
      let matchingTopFilters = { ingredient: "", ustensils: "", appliance: "" }
      matchingTopFilters.ingredient = matchingRecipeData.ingredients.map((ingredient) =>
        Utils.formatStringCharacters(ingredient.ingredient)
      )
      matchingTopFilters.ustensils = matchingRecipeData.ustensils.map((ustensil) =>
        Utils.formatStringCharacters(ustensil)
      )
      matchingTopFilters.appliance = Utils.formatStringCharacters(matchingRecipeData.appliance)
      let topFilterListElements
      for (let [key] of Object.entries(matchingTopFilters)) {
        topFilterListElements = document.querySelector(
          `[data-filter-list-category='${key}']`
        ).children
        for (let element of topFilterListElements) {
          if (matchingTopFilters[key].includes(Utils.formatStringCharacters(element.textContent)))
            this.manageAllTopFilters(element)
        }
      }
    }
  }
}
