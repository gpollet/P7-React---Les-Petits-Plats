import { dataset, filterDisplayStatus, userSelectedFilters } from "../store/store.js"
import { chevronIcon, Utils } from "../utils/Utils.js"
import { activeFilters } from "./active-filters.js"

export const createRecipeFilters = (main) => {
  let container = document.createElement("div")
  container.className = "top-filters-list_container"
  for (let filter of Object.keys(dataset)) {
    let displayFormat = Utils.getTopFiltersDisplayNames(filter)
    container.innerHTML += `<div class="top-filters_container">
    <label for="${filter}">
    <input type="search" class="top-filters_${filter} ${filter}" id="${filter}" name="${filter}" placeholder="${displayFormat}" aria-label="Rechercher par ${displayFormat}" data-active-filter="${
      filterDisplayStatus[filter]
    }"></input>
    </label>
 ${new chevronIcon().createChevronIcon("chevron-down")}
    <div class="top-filters_suggestions-container ${filter}" data-filter-visible="${
      filterDisplayStatus[filter]
    }" data-filter-category="${filter}">
    <ul class="top-filters_suggestions-list" data-filter-list-category="${filter}"></ul>
    </div></div>`
  }
  main.appendChild(container)
}

// For each top filter category, retrieves the category name and populates the top filter with the corresponding entries from the Store
export const createTopFilters = () => {
  const topFilters = document.querySelectorAll(".top-filters_container")
  for (let [key, value] of Object.entries(dataset)) {
    const topFilterList = document.querySelector(
      `[data-filter-list-category=${key}].top-filters_suggestions-list`
    )
    value.map((el) => {
      el = Utils.stringFirstLetterToUpperCase(el)
      const suggestionListItem = document.createElement("li")
      suggestionListItem.textContent += `${el}`
      suggestionListItem.addEventListener("click", () => {
        // Checks if filter was not already set active by user, if not set it as active then remove it from the list
        if (!userSelectedFilters[key].includes(el)) {
          new activeFilters(key, el, suggestionListItem).addActiveFilter()
          suggestionListItem.setAttribute("data-filter-visible", false)
        }
      })
      topFilterList.appendChild(suggestionListItem)
    })
  }
  createFilterButtonsEvents()
}

// Adds event listeners to top filters buttons
const createFilterButtonsEvents = () => {
  const categoryChevron = document.querySelectorAll(".top-filters_container svg")
  for (let chevron of categoryChevron) {
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
  const filterInputsFields = document.querySelectorAll("label > input")
  for (let inputField of filterInputsFields) {
    inputField.addEventListener("input", () => filterButtonState.filtersStateListener())
  }
}

class filterButtonState {
  constructor(event, chevron) {
    this.event = event
    this.chevron = chevron
    this.filterSuggestionsContainer = event.target.nextElementSibling
    this.filterCategory = this.filterSuggestionsContainer.getAttribute("data-filter-category")
    this.currentDisplayState = filterDisplayStatus[this.filterCategory]
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
      filterDisplayStatus[buttonCategory] = false
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
      // Closes all filter menus
      // Opens selected menu
      this.displayFilterList()
    } else {
      this.hideFilterList()
    }
  }

  displayFilterList() {
    Object.entries(filterDisplayStatus).forEach((filterCategory) => (filterCategory.value = false))
    this.event.target.classList = "chevron-up"
    this.chevron.innerHTML = new chevronIcon().updateChevronIcon("chevron-up")
    this.filterSuggestionsContainer.setAttribute("data-filter-visible", true)
    filterDisplayStatus[this.filterCategory] = true
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
    filterDisplayStatus[this.filterCategory] = false
  }
}

// Affichage filtres sélectionnés : si valeur saisie par utilisateur !== undefined dans le dataset, l'ajouter au store filtres user quand appuie sur Entrée ou clique sur suggestion en dessous.
