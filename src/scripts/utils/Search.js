import { displayWarning, hideWarning } from "../components/no-result-warning.js"
import { store } from "../store/store.js"
import { Utils } from "./Utils.js"

export class Search {
  constructor(value) {
    this.userInput = Utils.formatStringCharacters(value)
  }

  /*
  // Main search Option 1
  getMainSearchMatchingRecipes() {
    // Finds recipes with title, ingredients or description matching user's input
    const mainSearchMatchingRecipes = store.recipesData.filter(
      (recipe) =>
        recipe.name.includes(this.userInput) ||
        recipe.description.includes(this.userInput) ||
        recipe.ingredients.toString().includes(this.userInput)
    )
    store.matchingRecipes = mainSearchMatchingRecipes
    this.displayMatchingRecipeCards()
  }
  */

  // Main search Option 2
  getMainSearchMatchingRecipes() {
    const mainSearchMatchingRecipes = store.recipesKeywordsList.filter((recipe) => {
      if (recipe.keywords.filter((el) => el.includes(this.userInput)).length > 0) {
        let match = store.recipesData.find((matchingRecipe) => matchingRecipe.id == recipe.id)
        store.matchingRecipes.push(match)
      }
    })
    this.displayMatchingRecipeCards()
  }

  displayMatchingRecipeCards() {
    const recipeCards = document.querySelectorAll(".recipe-card_container")
    recipeCards.forEach((card) => {
      store.matchingRecipes.find((recipe) => recipe.id == card.getAttribute("data-card-id"))
        ? card.setAttribute("data-display-recipe", true)
        : card.setAttribute("data-display-recipe", false)
    })
    this.searchMatchingTopFilters()
  }

  // Displays/hides items listed in the top filters based on the recipes being displayed
  searchMatchingTopFilters() {
    const availableTags = document.querySelectorAll(".top-filters_suggestions-list li")
    // Hide all available tags, and if they match the displayed recipes, sets their visibility back to true
    availableTags.forEach((tag) => {
      tag.setAttribute("data-filter-visible", false)
    })
    if (!Object.values(store.matchingRecipes).length == 0) {
      hideWarning()
      store.matchingRecipes.forEach((recipe) => {
        let categoryToCheck = {
          ingredients: recipe.ingredients,
          ustensils: recipe.ustensils,
          appliance: [recipe.appliance],
        }
        Object.entries(categoryToCheck).forEach(([key, value]) => {
          if (key == "ingredients") key = "ingredient"
          const targetEl = document.querySelectorAll(
            `[data-filter-list-category="${key}"] .top-filters_suggestions-${key}`
          )
          targetEl.forEach((el) => {
            if (
              value.includes(Utils.formatStringCharacters(el.textContent)) &&
              !store.userSelectedFilters[key].includes(Utils.formatStringCharacters(el.textContent))
            )
              el.setAttribute("data-filter-visible", true)
          })
        })
      })
    } else {
      displayWarning()
    }
  }

  getRecipesMatchingAddedTag(tagCategory) {
    if (tagCategory == "ingredient") tagCategory = "ingredients"
    const results = store.matchingRecipes.filter((recipe) =>
      recipe[tagCategory].includes(this.userInput)
    )
    store.matchingRecipes = results
    this.displayMatchingRecipeCards()
  }

  getRecipesMatchingRemovedTag(tagCategory) {
    store.matchingRecipes = store.recipesData
    // Checks if main search input is empty. If not, sets matchingRecipes as the result of that search.
    const searchBarContent = document.querySelector(".top-search_bar").value
    if (searchBarContent.length >= 3) {
      this.userInput = searchBarContent
      this.getMainSearchMatchingRecipes()
    }
    if (tagCategory == "ingredient") tagCategory = "ingredients"
    for (let keys of Object.keys(store.userSelectedFilters)) {
      // Checks if there are active tags
      if (store.userSelectedFilters[keys].length > 0) {
        for (let [key] of Object.entries(store.userSelectedFilters)) {
          for (let value of Object.values(store.userSelectedFilters[key])) {
            this.userInput = value
            return this.getRecipesMatchingAddedTag(key)
          }
        }
      }
    }
    this.displayMatchingRecipeCards()
  }
}
