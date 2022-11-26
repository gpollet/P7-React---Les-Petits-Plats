import { chevronIcon, dataset, filterDisplayStatus } from "../store/store.js"

export const createRecipeFilters = (main) => {
  let container = document.createElement("div")
  container.className = "top-filters-list_container"
  for (let filter of Object.keys(dataset)) {
    let displayFormat
    if (filter === "ingredient") {
      displayFormat = "ingrédients"
    } else if (filter == "appliance") {
      displayFormat = "appareils"
    } else if (filter == "ustensils") {
      displayFormat = "ustensiles"
    }
    container.innerHTML += `<div class="top-filters_container">
    <label for="${filter}">
    <input type="search" class="top-filters_${filter}" id="${filter}" name="${filter}" placeholder="${displayFormat}" aria-label="Rechercher par ${displayFormat}"></input>
    </label>
 ${new chevronIcon().createChevronIcon("chevron-down")}
    <div class="top-filters_suggestions-container" data-filter-visible="${
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
  for (let topFilter of topFilters) {
    for (let [key, value] of Object.entries(dataset)) {
      const topFilterList = document.querySelector(
        `[data-filter-list-category=${key}].top-filters_suggestions-list`
      )
      value.map((el) => {
        const suggestionListItem = document.createElement("li")
        suggestionListItem.textContent += el
        topFilterList.appendChild(suggestionListItem)
      })
    }
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
}

class filterButtonState {
  constructor(event, chevron) {
    this.event = event
    this.chevron = chevron
    this.filterSuggestionsContainer = event.target.nextElementSibling
    this.filterCategory = this.filterSuggestionsContainer.getAttribute("data-filter-category")
    this.currentDisplayState = filterDisplayStatus[this.filterCategory]
  }

  // When opening a new filter menu, makes sure any other filter menu opened is being closed before opening the new one
  filtersStateListener = () => {
    const filtersButtons = document.querySelectorAll("[data-filter-visible]")
    for (let button of filtersButtons) {
      if (button !== this.filterSuggestionsContainer) {
        button.previousElementSibling.innerHTML = new chevronIcon().createChevronIcon(
          "chevron-down"
        )
        const buttonCategory = button.getAttribute("data-filter-category")
        button.setAttribute("data-filter-visible", false)
        filterDisplayStatus[buttonCategory] = false
      }
    }
  }

  // Gets the current display state of the targetted filter. If it is already being displayed, hides it. If not, displays it.
  manageState() {
    if (this.currentDisplayState == false) {
      // Closes all filter menus
      this.filtersStateListener()
      // Opens selected menu
      this.displayFilterList()
    } else {
      this.hideFilterList()
    }
  }

  displayFilterList() {
    Object.entries(filterDisplayStatus).forEach((filterCategory) => (filterCategory.value = false))
    this.event.target.classList = "chevron-up"
    this.chevron.innerHTML = new chevronIcon().createChevronIcon("chevron-up")
    this.filterSuggestionsContainer.setAttribute("data-filter-visible", true)
    filterDisplayStatus[this.filterCategory] = true
  }

  hideFilterList() {
    this.event.target.classList = "chevron-down"
    this.chevron.innerHTML = new chevronIcon().createChevronIcon("chevron-down")
    this.filterSuggestionsContainer.setAttribute("data-filter-visible", false)
    filterDisplayStatus[this.filterCategory] = false
  }
}
