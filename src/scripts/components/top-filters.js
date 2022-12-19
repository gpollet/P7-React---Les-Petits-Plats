import { store } from "../store/store.js"
import { Search } from "../utils/Search.js"
import { chevronIcon, Utils } from "../utils/Utils.js"
import { Tag } from "../models/Tag.js"

export const createRecipeFilters = (main) => {
  let container = document.createElement("div")
  container.className = "top-filters-list_container"
  for (let filter of Object.keys(store.dataset)) {
    let displayFormat = Utils.getTopFiltersDisplayNames(filter)
    container.innerHTML += `<div class="top-filters_container">
    <label for="${filter}">
    <input type="search" class="top-filters_${filter} ${filter}" id="${filter}" name="${filter}" placeholder="${displayFormat}" aria-label="Rechercher par ${displayFormat}" data-active-filter="${
      store.filterDisplayStatus[filter]
    }"></input>
    </label>
 ${new chevronIcon().createChevronIcon("chevron-down")}
    <div class="top-filters_suggestions-container ${filter}" data-filter-visible="${
      store.filterDisplayStatus[filter]
    }" data-filter-category="${filter}">
    <ul class="top-filters_suggestions-list" data-filter-list-category="${filter}"></ul>
    </div></div>`
  }
  main.appendChild(container)
}

// For each top filter category, retrieves the category name and populates the top filter with the corresponding entries from the Store
export const createTopFilters = () => {
  for (let [key, value] of Object.entries(store.dataset)) {
    const topFilterList = document.querySelector(
      `[data-filter-list-category=${key}].top-filters_suggestions-list`
    )
    value.map((el) => {
      el = Utils.stringFirstLetterToUpperCase(el)
      const tagElement = document.createElement("li")
      tagElement.textContent += `${el}`
      tagElement.setAttribute("data-filter-visible", true)
      tagElement.className = `top-filters_suggestions-${key}`
      tagElement.addEventListener("click", () => {
        // Checks if filter was not already set active by user, if not set it as active then remove it from the list
        if (!store.userSelectedFilters[key].includes(Utils.formatStringCharacters(el))) {
          new Tag(key, el, tagElement).addActiveFilter()
          tagElement.setAttribute("data-filter-visible", false)
          //new Search(el).getRecipesMatchingAddedTag()
        }
      })
      topFilterList.appendChild(tagElement)
    })
  }
  createFilterButtonsEvents()
}

// Adds event listeners to top filters buttons
const createFilterButtonsEvents = () => {
  const categoryChevron = document.querySelectorAll(".top-filters_container svg")
  for (let chevron of categoryChevron) {
    // Clicking on top filter chevron opens/close the suggestions and turns the chevron up/down depending on its previous state (opened/closed)
    chevron.addEventListener("click", (event) => {
      new filterButtonState(event, chevron).manageState()
    })
    chevron.addEventListener("keypress", (event) => {
      if (event.key == " ") {
        event.preventDefault()
      }
      new filterButtonState(event, chevron).manageState()
    })
  }
}

export const createTopFiltersInputsEvents = () => {
  const filterInputsFields = document.querySelectorAll("label > input")
  for (let inputField of filterInputsFields) {
    inputField.addEventListener("input", (event) => {
      new Search(inputField.value).searchMatchingIngredients(event.target)
    })
    // Resets top-filter input field on focusout if user simply input a space
    inputField.addEventListener("focusout", (event) => {
      if (event.target.value == " ") event.target.value = ""
    })
  }
}

class filterButtonState {
  constructor(event, chevron) {
    this.event = event
    this.chevron = chevron
    this.filterSuggestionsContainer = this.event.target.closest(".top-filters_container").children[2]
    this.filterCategory = this.filterSuggestionsContainer.getAttribute("data-filter-category")
    this.currentDisplayState = store.filterDisplayStatus[this.filterCategory]
  }

  // When opening a new filter menu or input, makes sure any other filter menu opened is being closed before opening the new one
  static filtersStateListener = () => {
    const filtersButtons = document.querySelectorAll(
      "[data-filter-visible].top-filters_suggestions-container"
    )
    for (let button of filtersButtons) {
      const buttonCategory = button.getAttribute("data-filter-category")
      button.previousElementSibling.innerHTML = new chevronIcon().updateChevronIcon("chevron-down")
      button.setAttribute("data-filter-visible", false)
      store.filterDisplayStatus[buttonCategory] = false
      // When closing filter menu, sets category name back as placeholder
      const newPlaceholder = Utils.getTopFiltersDisplayNames(buttonCategory)
      const filterInput = document.querySelector(`.top-filters_${buttonCategory}`)
      filterInput.setAttribute("data-active-filter", "false")
      filterInput.setAttribute("placeholder", `${newPlaceholder}`)
    }
  }

  // Gets the current display state of the targetted filter. If it is already being displayed, hides it. If not, displays it.
  manageState() {
    filterButtonState.filtersStateListener()
    if (this.currentDisplayState == false) {
      // Opens selected menu
      // Closes all filter menus
      this.displayFilterList()
    } else {
      this.hideFilterList()
    }
  }

  displayFilterList() {
    Object.entries(store.filterDisplayStatus).forEach((filterCategory) => (filterCategory.value = false))
    this.event.target.classList = "chevron-up"
    this.chevron.innerHTML = new chevronIcon().updateChevronIcon("chevron-up")
    this.filterSuggestionsContainer.setAttribute("data-filter-visible", true)
    store.filterDisplayStatus[this.filterCategory] = true
    const newPlaceholder = Utils.getTopFiltersDisplayNames(this.filterCategory).toLowerCase()
    const filterInput = document.querySelector(`.top-filters_${this.filterCategory}`)
    filterInput.setAttribute(
      "placeholder",
      `Rechercher un ${newPlaceholder.slice(0, newPlaceholder.length - 1)}`
    )
    filterInput.setAttribute("data-active-filter", true)
  }

  hideFilterList() {
    this.event.target.classList = "chevron-down"
    this.chevron.innerHTML = new chevronIcon().updateChevronIcon("chevron-down")
    this.filterSuggestionsContainer.setAttribute("data-filter-visible", false)
    store.filterDisplayStatus[this.filterCategory] = false
  }
}

// Affichage filtres sélectionnés : si valeur saisie par utilisateur !== undefined dans le dataset, l'ajouter au store filtres user quand appuie sur Entrée ou clique sur suggestion en dessous.
