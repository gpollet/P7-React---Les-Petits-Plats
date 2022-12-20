import { store } from "../store/store.js"
import { Search } from "../utils/Search.js"
import { Utils } from "../utils/Utils.js"

export function createSearchBar(container) {
  container.innerHTML += `<div class="top-search_container"><input type="search" class="top-search_bar" placeholder="Rechercher une recette" aria-label="Rechercher une recette"></input><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M416 208c0 45.9-14.9 88.3-40 122.7L486.6 441.4 509.3 464 464 509.3l-22.6-22.6L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"/></svg></div>`
  searchBarEventListener()
}

function searchBarEventListener() {
  const searchBar = document.querySelector(".top-search_bar")
  searchBar.addEventListener("input", () => {
    // On each input, resets matchingRecipes (otherwise it would keep matching recipes from previous inputs)
    store.matchingRecipes = []
    if (searchBar.value.length >= 3) {
      new Search(searchBar.value).getMainSearchMatchingRecipesA()
      if (searchBar.value.includes("benchmark")) {
        let stringToBenchmark = searchBar.value.replace("benchmark", "")
        Utils.benchmarkPerformances(stringToBenchmark)
      }
    } else {
      // Makes sure recipes are visible again if user input is < 3 characters, and resets matchingRecipes
      store.matchingRecipes = store.recipesData
      document.querySelectorAll(".recipe-card_container").forEach((card) => {
        card.setAttribute("data-display-recipe", true)
      })
      // If user input in main search bar is < 3 characters, displays all suggested items in the top filters
      const topFiltersLists = document.querySelectorAll(".top-filters_suggestions-list li")
      for (let element of topFiltersLists) {
        element.setAttribute("data-filter-visible", true)
      }
    }
  })
}
