import { recipes } from "../api/recipes.js"
import { matchingRecipes, recipesData, userSelectedFilters } from "../store/store.js"
import { Utils } from "./Utils.js"

export class Search {
  constructor(value) {
    this.userInput = Utils.formatStringCharacters(value)
  }

  getMainSearchMatchingRecipes() {
    // Finds recipes with title, ingredients or description matching user's input
    const mainSearchMatchingRecipes = recipesData.filter(
      (recipe) =>
        recipe.name.includes(this.userInput) ||
        recipe.description.includes(this.userInput) ||
        recipe.ingredients.toString().includes(this.userInput)
    )
    mainSearchMatchingRecipes.forEach((el) => matchingRecipes.push(el))
    this.displayMatchingRecipeCards()
    this.searchMatchingTopFilters()
  }

  displayMatchingRecipeCards() {
    const recipeCards = document.querySelectorAll(".recipe-card_container")
    recipeCards.forEach((card) => {
      matchingRecipes.find((recipe) => recipe.id == card.getAttribute("data-card-id"))
        ? card.setAttribute("data-display-recipe", true)
        : card.setAttribute("data-display-recipe", false)
    })
  }

  // When user types in top filter inputs, hides items that do not match
  searchMatchingIngredients(targetInput) {
    const matchingTopFilterElement = document.querySelectorAll(
      `.top-filters_suggestions-${targetInput.id}`
    )
    matchingTopFilterElement.forEach((el) => {
      const elementNormalizedTextContent = Utils.formatStringCharacters(el.textContent)
      elementNormalizedTextContent.includes(this.userInput) &&
      !userSelectedFilters[targetInput.id].includes(elementNormalizedTextContent)
        ? this.displayTopFiltersElements(el)
        : this.hideNonTopFiltersElements(el)
    })
  }

  // Displays the top filter <li> element that is passed down as var (can be an element matching main search/top filter user input)
  displayTopFiltersElements(element) {
    element.setAttribute("data-filter-visible", true)
  }

  // Hides the top filter <li> element that is passed down as var
  hideNonTopFiltersElements(element) {
    element.setAttribute("data-filter-visible", false)
  }

  // Displays/hides items listed in the top filters based on the recipes being displayed
  searchMatchingTopFilters() {
    let matchingRecipesSuggestedTags = []
    matchingRecipes.map((recipe) => {
      let categoryToCheck = [recipe.ingredients, recipe.ustensils, [recipe.appliance]]
      Object.values(categoryToCheck).forEach((element) => {
        element.map((entry) => {
          if (!matchingRecipesSuggestedTags.includes(entry))
            matchingRecipesSuggestedTags = [...matchingRecipesSuggestedTags.flat(), entry]
        })
      })
    })
    const availableTags = document.querySelectorAll(".top-filters_suggestions-list li")
    availableTags.forEach((tag) => {
      tag.setAttribute(
        "data-filter-visible",
        matchingRecipesSuggestedTags.includes(Utils.formatStringCharacters(tag.textContent))
      )
    })
  }

  /*
  searchMatchingTopFilters(matchingRecipeId) {
    if (matchingRecipeId) {
      const matchingRecipeData = recipes.find((recipe) => recipe.id == matchingRecipeId)
      // List ingredients, ustensils and appliances matching the main search bar results
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
          // If element is an active filter, do not display it back into the suggested top filter items
          for (let [key] of Object.entries(userSelectedFilters)) {
            if (userSelectedFilters[key].includes(elementNormalizedTextContent)) {
              elementIsActiveFilter = true
              break
            }
          }
          // If element is not an active top filter but matches the displayed recipes, display it in the top filter suggestions
          if (
            matchingTopFilters[key].includes(elementNormalizedTextContent) &&
            !elementIsActiveFilter
          ) {
            this.displayTopFiltersElements(element)
          }
        }
      }
    }
  }
  */
}
