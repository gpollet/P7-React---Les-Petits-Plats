import { userSelectedFilters } from "../store/store.js"
import { closeIcon, Utils } from "../utils/Utils.js"

export class activeFilters {
  constructor(category, item, suggestedElement) {
    this.category = category
    this.item = item
    this.suggestedElement = suggestedElement
    this.container = document.querySelector(".active-filters_container")
  }

  static createActiveFiltersContainer(parent) {
    const activeFiltersContainer = document.createElement("div")
    activeFiltersContainer.className = "active-filters_container"
    parent.appendChild(activeFiltersContainer)
    //for (let [key] of Object.entries(userSelectedFilters)) {
    //  const categoryContainer = document.createElement("div")
    //  categoryContainer.className = `active-filters_${key}-container`
    //  activeFiltersContainer.appendChild(categoryContainer)
    //}
  }

  // Adds selected item to active filter if it is not already active
  addActiveFilter() {
    let activeFilterCategoryContainer
    const newActiveFilterButton = document.createElement("div")
    newActiveFilterButton.className = `active-filters_item ${this.category}`
    newActiveFilterButton.textContent = `${this.item}`
    newActiveFilterButton.innerHTML += `${closeIcon}`
    if (!document.querySelector(`.active-filters_item.${this.category}`)) {
      activeFilterCategoryContainer = document.querySelector(`.active-filters_container`)
      activeFilterCategoryContainer.appendChild(newActiveFilterButton)
    } else {
      activeFilterCategoryContainer = document.querySelector(
        `.active-filters_item.${this.category}`
        )
        activeFilterCategoryContainer.insertAdjacentElement("afterend", newActiveFilterButton)
    }
    userSelectedFilters[this.category].push(this.item)
    this.removeActiveFilterEvent(newActiveFilterButton)
  }

  // Removes active filter from the store and the DOM when clicking on its "X" icon
  removeActiveFilterEvent(activeFilterButton) {
    activeFilterButton.addEventListener("click", (event) => {
      if (event.target.classList.value == "active-filter-close_button") {
        userSelectedFilters[this.category] = userSelectedFilters[this.category].filter(
          (el) => el !== this.item
        )
        activeFilterButton.remove()
        this.suggestedElement.setAttribute("data-filter-visible", true)
      }
    })
  }
}
