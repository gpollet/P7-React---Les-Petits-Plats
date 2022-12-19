import { store } from "../store/store.js"
import { Search } from "../utils/Search.js"
import { chevronIcon, Utils } from "../utils/Utils.js"
import { Tag } from "../models/Tag.js"
import { filterButtonState } from "../models/TopFilterState.js"

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
        el = Utils.formatStringCharacters(el)
        if (!store.userSelectedFilters[key].includes(el)) {
          // Creates an element in the DOM displaying the added active tag
          new Tag(key, Utils.stringFirstLetterToUpperCase(el), tagElement).addActiveFilter()
          // Adds the new active filter to the store keeping track of user selected filters
          store.userSelectedFilters[key].push(el)
          new Search(el).getRecipesMatchingAddedTag(key)
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
    // When user types in top filter inputs, hides items that do not match
    inputField.addEventListener("input", (event) => {
      const matchingTopFilterElement = document.querySelectorAll(
        `.top-filters_suggestions-${event.target.id}`
      )
      matchingTopFilterElement.forEach((el) => {
        const elementNormalizedTextContent = Utils.formatStringCharacters(el.textContent)
        const elementMatchingStatus =
          elementNormalizedTextContent.includes(Utils.formatStringCharacters(inputField.value.trim())) &&
          !store.userSelectedFilters[event.target.id].includes(elementNormalizedTextContent)
        el.setAttribute("data-filter-visible", elementMatchingStatus)
      })
    })
    // Resets top-filter input field on focusout if user simply input a space
    inputField.addEventListener("focusout", (event) => {
      if (event.target.value == " ") event.target.value = ""
    })
  }
}