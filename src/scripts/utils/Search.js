import { recipes } from "../api/recipes.js"
import { dataset, recipesTitlesKeywords, userSelectedFilters } from "../store/store.js"
import { Utils } from "./Utils.js"

export class Search {
  constructor(value) {
    this.userInput = Utils.formatStringCharacters(value)
    this.matchingRecipe = []
  }

  searchMatchingTitles() {
    this.matchingRecipes = recipesTitlesKeywords.filter((recipe) =>
      recipe.keywords.find((el) => el.includes(this.userInput))
    )
    const recipeCards = document.querySelectorAll(".recipe-card_container")
    recipeCards.forEach((card) => {
      card.setAttribute("data-display-recipe", false)
    })
    // Sets visibility of top filters to false, then if filter matches user input, set it to true
    this.manageAllTopFilters()
    this.matchingRecipes.forEach((recipe) => {
      document
        .querySelector(`[data-card-id="${recipe.id}"]`)
        .setAttribute("data-display-recipe", true)
      this.searchMatchingTopFilters(recipe.id)
    })
    //this.searchActiveIngredientsTagsMatches()
  }

  // If user input in main search bar is < 3 characters, display all list items in the top filters
  manageAllTopFilters() {
    const topFiltersLists = document.querySelectorAll(".top-filters_suggestions-list li")
    for (let element of topFiltersLists) {
      if (this.userInput.length < 3) {
        this.displayTopFiltersElements(element)
      } else {
        this.hideNonTopFiltersElements(element)
      }
    }
  }

  // Displays the top filter <li> element that is passed down as var (can be an element matching main search/top filter user input)
  displayTopFiltersElements(element) {
    element.setAttribute("data-filter-visible", true)
  }

  // Hides the top filter <li> element that is passed down as var
  hideNonTopFiltersElements(element) {
    element.setAttribute("data-filter-visible", false)
  }

  searchMatchingTopFilters(matchingRecipeId) {
    if (matchingRecipeId) {
      const matchingRecipeData = recipes.find((recipe) => recipe.id == matchingRecipeId)
      // List ingredients, ustenssils and appliances matching the main search bar results
      let matchingTopFilters = { ingredient: "", ustensils: "", appliance: "" }
      matchingTopFilters.ingredient = matchingRecipeData.ingredients.map((ingredient) =>
        Utils.formatStringCharacters(ingredient.ingredient)
      )
      matchingTopFilters.ustensils = matchingRecipeData.ustensils.map((ustensil) =>
        Utils.formatStringCharacters(ustensil)
      )
      matchingTopFilters.appliance = Utils.formatStringCharacters(matchingRecipeData.appliance)
      // Hides non-matching elements from top filters
      let topFilterListElements
      for (let [key] of Object.entries(matchingTopFilters)) {
        topFilterListElements = document.querySelector(
          `[data-filter-list-category='${key}']`
        ).children
        for (let element of topFilterListElements) {
          const elementNormalizedTextContent = Utils.formatStringCharacters(element.textContent)
          let elementIsActiveFilter = false
          for (let [key] of Object.entries(userSelectedFilters)) {
            if (userSelectedFilters[key].includes(elementNormalizedTextContent)) {
              elementIsActiveFilter = true
              break
            }
          }
          if (matchingTopFilters[key].includes(elementNormalizedTextContent) && !elementIsActiveFilter) {
            this.displayTopFiltersElements(element)
          }
        }
      }
    }
  }

  searchActiveIngredientsTagsMatches() {
    console.log(userSelectedFilters)
    if (userSelectedFilters.ingredient.length > 0) {
      //console.log("ok")
    }
  }
}
