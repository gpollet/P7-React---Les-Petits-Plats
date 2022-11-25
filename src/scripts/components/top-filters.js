import { chevronDownIcon, chevronUpIcon, dataset, filterDisplayStatus } from "../store/store.js"

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
    <svg class="chevron-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->${chevronDownIcon}
    </svg>
    <div class="top-filters_suggestions-container" data-filter-visible="false" data-filter-category="${filter}">
    <ul class="top-filters_suggestions-list" data-filter-list-category="${filter}"></ul>
    </div></div>`
  }
  main.appendChild(container)
}

// Change the top-filters chevron icon direction on focus in/out
export const trackTopFilterChevronDirection = () => {
  const chevronContainer = document.querySelectorAll(".top-filters_container label")
  for (let label of chevronContainer) {
    const inputField = label.firstElementChild
    inputField.addEventListener(
      "focusin",
      () => (inputField.nextElementSibling.outerHTML = chevronUpIcon)
    )
    inputField.addEventListener(
      "focusout",
      () => (inputField.nextElementSibling.outerHTML = chevronDownIcon)
    )
  }
  createFilterButtonsEvents()
}

export const createTopFiltersSuggestions = () => {
  const topFilters = document.querySelectorAll(".top-filters_container")
  for (let topFilter of topFilters) {
    // For each top filter category, retrieves the category name and populates the top filter with the corresponding entries from the Store
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
}

export const createFilterButtonsEvents = () => {
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
    chevron.addEventListener("focusout", (event) => {
      new filterButtonState(event, chevron).hideFilterList()
    })
  }
}

class filterButtonState {
  constructor(event, chevron) {
    this.eventTargetClass = event.target.classList
    this.chevron = chevron
    this.filterSuggestionsContainer = event.target.nextElementSibling
    this.filterCategory = this.filterSuggestionsContainer.getAttribute("data-filter-category")
    this.currentDisplayState = filterDisplayStatus[this.filterCategory]
  }

  manageState() {
    if (this.currentDisplayState == false) {
      this.displayFilterList()
    } else {
      this.hideFilterList()
    }
  }

  displayFilterList() {
    this.eventTargetClass = "chevron-up"
    this.chevron.innerHTML = chevronUpIcon
    this.filterSuggestionsContainer.setAttribute("data-filter-visible", true)
    filterDisplayStatus[this.filterCategory] = true
  }

  hideFilterList() {
    this.eventTargetClass = "chevron-down"
    this.chevron.innerHTML = chevronDownIcon
    this.filterSuggestionsContainer.setAttribute("data-filter-visible", false)
    filterDisplayStatus[this.filterCategory] = false
  }
}