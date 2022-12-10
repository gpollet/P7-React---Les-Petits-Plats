import { recipes } from "../api/recipes.js"
import { dataset, recipesTitlesKeywords, userSelectedFilters } from "../store/store.js"
import { Utils } from "./Utils.js"

export class Search {
  constructor(value) {
    this.userInput = Utils.formatStringCharacters(value)
    this.matchingRecipe = []
  }

  searchMatchingTitles() {
    // Finds recipes with title matching user's input
    const matchingTitles = recipesTitlesKeywords.filter((recipe) =>
      recipe.keywords.find((el) => el.includes(this.userInput))
    )
    // Finds recipes with description matching user's input
    const matchingDescriptions = recipes.filter((recipe) =>
      Utils.formatStringCharacters(recipe.description).includes(this.userInput)
    )
    const matchingIngredients = recipes.filter((recipe) =>
      recipe.ingredients
        // Creates a single array containing all recipe's ingredients, then convert it to string to check if it contains user's input
        .flatMap((ingredient) => Utils.formatStringCharacters(ingredient.ingredient))
        .toString()
        .includes(this.userInput)
    )
    this.matchingRecipe = matchingTitles.concat(matchingDescriptions).concat(matchingIngredients)
    const recipeCards = document.querySelectorAll(".recipe-card_container")
    recipeCards.forEach((card) => {
      card.setAttribute("data-display-recipe", false)
    })
    // Sets visibility of top filters to false, then if filter matches user input, set it to true
    this.manageAllTopFilters()
    this.matchingRecipe.forEach((recipe) => {
      document
        .querySelector(`[data-card-id="${recipe.id}"]`)
        .setAttribute("data-display-recipe", true)
      this.searchMatchingTopFilters(recipe.id)
    })
  }

  // When user types in top filter inputs, hides items that do not match
  searchMatchingIngredients(targetInput) {
    const matchingTopFilterElement = document.querySelectorAll(
      `.top-filters_suggestions-${targetInput.id}`
    )
    matchingTopFilterElement.forEach((el) => {
      const elementNormalizedTextContent = Utils.formatStringCharacters(el.textContent)
      if (
        elementNormalizedTextContent.includes(Utils.formatStringCharacters(this.userInput)) &&
        !userSelectedFilters[targetInput.id].includes(elementNormalizedTextContent)
      ) {
        this.displayTopFiltersElements(el)
      } else {
        this.hideNonTopFiltersElements(el)
      }
    })
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

  // Displays/hides items listed in the top filters based on the recipes being displayed
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

  searchRecipesMatchingTopFilters() {
    console.log(this.userInput)
    const recipeIngredients = recipes.map((recipe) => recipe.ingredients)
    console.log(recipes)
    //recipes.forEach((recipe) => {
    //  console.log(Object.values(recipe.ingredients))
    //  console.log(Object.values(recipe.ingredients).includes("Oignon"))
    //})
    if (userSelectedFilters.ingredient.length > 0) {
      //console.log("ok")
    }
  }
}
