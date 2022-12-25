import { displayWarning, hideWarning } from "../components/no-result-warning.js"
import { store } from "../store/store.js"
import { Utils } from "./Utils.js"

export class Search {
  constructor(value) {
    this.userInput = Utils.formatStringCharacters(value)
  }

  getMainSearchMatchingRecipes() {
    store.matchingRecipes = store.recipesKeywordsList.filter((recipe) => {
      if (recipe.keywords.filter((el) => el.includes(this.userInput)).length > 0) {
        return store.matchingRecipes.filter((matchingRecipe) => matchingRecipe.id == recipe.id)
      }
    })
  }

  getRecipesMatchingTagsAndSearch(tagCategory) {
    // On each input, resets matchingRecipes (otherwise it would keep matching recipes from previous inputs)
    store.matchingRecipes = store.recipesData
    // Checks if main search input is empty. If not and length > 3 characters, display cards matching the input
    const searchBarContent = document.querySelector(".top-search_bar").value
    if (searchBarContent.length >= 3) {
      this.getMainSearchMatchingRecipes()
    }
    if (tagCategory == "ingredient") tagCategory = "ingredients"
    // Checks if there are active tags
    if (Utils.userHasActiveTags)
      for (let [key] of Object.entries(store.userSelectedFilters)) {
        for (let value of Object.values(store.userSelectedFilters[key])) {
          this.userInput = value
          return this.getRecipesMatchingAddedTag(key)
        }
      }
    Search.displayMatchingRecipeCards()
  }

  static displayMatchingRecipeCards() {
    const recipeCards = document.querySelectorAll(".recipe-card_container")
    recipeCards.forEach((card) => {
      store.matchingRecipes.find((recipe) => recipe.id == card.getAttribute("data-card-id"))
        ? card.setAttribute("data-display-recipe", true)
        : card.setAttribute("data-display-recipe", false)
    })
    Search.searchMatchingTopFilters()
  }

  // Displays/hides items listed in the top filters based on the recipes being displayed
  static searchMatchingTopFilters() {
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
    Search.displayMatchingRecipeCards()
  }
}
