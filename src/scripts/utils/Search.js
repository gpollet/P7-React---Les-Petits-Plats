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
  searchMatchingIngredients(eventTarget) {
    const matchingTopFilterElement = document.querySelectorAll(
      `.top-filters_suggestions-${eventTarget.id}`
    )
    matchingTopFilterElement.forEach((el) => {
      const elementNormalizedTextContent = Utils.formatStringCharacters(el.textContent)
      elementNormalizedTextContent.includes(this.userInput) &&
      !userSelectedFilters[eventTarget.id].includes(elementNormalizedTextContent)
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

  getRecipesMatchingAddedTag(tagCategory) {
    if (tagCategory == "ingredient") tagCategory = "ingredients"
    const results = matchingRecipes.filter((recipe) => 
      recipe[tagCategory].includes(this.userInput)
    )
    matchingRecipes.splice(0)
    results.forEach((result) => matchingRecipes.push(result))
    this.searchMatchingTopFilters()
    this.displayMatchingRecipeCards()
  }
}
